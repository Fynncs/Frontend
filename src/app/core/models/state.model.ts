import { BehaviorSubject, Observable } from 'rxjs';
import { State } from '../enum/state.enum';
import { IModelState } from '@fynnc.models';

/**
 * Generic class to manage the state of a model.
 * Allows tracking modifications, controlling states, and notifying changes through observables.
 *
 * @template T Type of the model represented by the class.
 */
export class ModelState<T extends Record<string, any>> implements IModelState<T> {
  /** Original data of the model. */
  private _data: T;

  /** Proxy that intercepts modifications to the data. */
  private _proxy: T;

  /** Current state of the model (ORIGINAL, NEW, MODIFIED, DELETED). */
  private _state: State;

  /** Observable that notifies state changes. */
  private _stateSubject: BehaviorSubject<State>;

  /** Set that stores modified attributes. */
  private _modifiedAttributes: Set<keyof T>;

  /**
   * Creates an instance of ModelState.
   * @param {T} data - Initial data of the model.
   * @param {State} [state=State.ORIGINAL] - Initial state of the model.
   */
  constructor(data: T, state: State = State.ORIGINAL) {
    this._data = { ...data };
    this._state = state;
    this._stateSubject = new BehaviorSubject<State>(this._state);
    this._modifiedAttributes = new Set<keyof T>();

    this._proxy = this._createProxy(this._data);
  }

  /**
   * Creates a Proxy to intercept changes to the model's data.
   * @param {T} obj - Original model object.
   * @returns {T} Proxy of the model object.
   * @private
   */
  private _createProxy(obj: T): T {
    return new Proxy(obj, {
      set: (target, property, value) => {
        if (typeof property === 'string' && property in target) {
          const key = property as keyof T;
          if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
            value = this._createProxy(value); 
          }
          if (target[key] !== value) {
            this._modifiedAttributes.add(key);
            target[key] = value;
            if (this._state === State.ORIGINAL) {
              this.markAsModified();
            }
          }
        }
        return true;
      }
    });
  }

  /**
   * Gets the model's data through the Proxy.
   * @returns {T} Model data.
   */
  get data(): T {
    return this._proxy;
  }

  /**
   * Returns an Observable that notifies changes in the model's state.
   * @returns {Observable<State>} Observable of the state.
   */
  get state$(): Observable<State> {
    return this._stateSubject.asObservable();
  }

  /**
   * Returns the current state of the model.
   * @returns {State} Current model state.
   */
  get state(): State {
    return this._state;
  }

  /**
   * Changes the current state of the model and notifies observers.
   * @param {State} newState - New state to be set.
   * @private
   */
  private setState(newState: State): void {
    this._state = newState;
    this._stateSubject.next(newState);
  }

  /**
   * Marks the model as NEW.
   */
  markAsNew(): void {
    this.setState(State.NEW);
  }

  /**
   * Marks the model as MODIFIED, if applicable.
   */
  markAsModified(): void {
    if (this._state !== State.NEW && this._state !== State.DELETED) {
      this.setState(State.MODIFIED);
    }
  }

  /**
   * Marks the model as DELETED, if allowed.
   * @throws {Error} Throws an error if the model is in the NEW state.
   */
  markAsDeleted(): void {
    if (this._state === State.NEW) {
      throw new Error('New items cannot be marked as deleted.');
    }
    this.setState(State.DELETED);
  }

  /**
   * Restores the model to the ORIGINAL state.
   * Clears the modified attributes.
   */
  restore(): void {
    if (this._state === State.DELETED) {
      this.setState(State.ORIGINAL);
    }
    this._modifiedAttributes.clear();
  }

  /**
   * Gets a list of modified attributes in the model.
   * @returns {(keyof T)[]} List of modified attributes.
   */
  getModifiedAttributes(): (keyof T)[] {
    return Array.from(this._modifiedAttributes);
  }

  /**
   * Clears all attributes marked as modified.
   */
  clearModifiedAttributes(): void {
    this._modifiedAttributes.clear();
  }

  /**
   * Checks if the current state is NEW.
   * @returns {boolean} True if the state is NEW.
   */
  isNew(): boolean {
    return this._state === State.NEW;
  }

  /**
   * Checks if the current state is MODIFIED.
   * @returns {boolean} True if the state is MODIFIED.
   */
  isModified(): boolean {
    return this._state === State.MODIFIED;
  }

  /**
   * Checks if the current state is DELETED.
   * @returns {boolean} True if the state is DELETED.
   */
  isDeleted(): boolean {
    return this._state === State.DELETED;
  }

  /**
   * Checks if the current state is ORIGINAL.
   * @returns {boolean} True if the state is ORIGINAL.
   */
  isOriginal(): boolean {
    return this._state === State.ORIGINAL;
  }
}
