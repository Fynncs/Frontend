import { State } from '../enum/state.enum';

/**
 * ModelState Interface
 * Basic contract for any model class with state.
 */
export interface IModelState<T> {
  data: T;
  state: State;
  getModifiedAttributes(): (keyof T)[];
  clearModifiedAttributes(): void;
  markAsNew(): void;
  markAsModified(): void;
  markAsDeleted(): void;
  restore(): void;
}
