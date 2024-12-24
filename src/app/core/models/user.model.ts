import { ModelState, IUser } from '@fynnc.models';

export class User extends ModelState<IUser> implements IUser {
  private _id?: number;
  private _name?: string;
  private _fullName?: string;
  private _email?: string;
  private _phone?: string;
  private _birthDate?: Date;
  private _gender?: 'male' | 'female' | 'other' | 'not informed';
  private _nationality?: string;
  private _maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed' | 'other';
  private _profession?: string;
  private _academicBackground?: string;
  private _username?: string;
  private _password?: string;

  constructor(user: IUser) {
    super(user);
    this._id = user.id;
    this._name = user.name;
    this._fullName = user.fullName;
    this._email = user.email;
    this._phone = user.phone;
    this._birthDate = user.birthDate;
    this._gender = user.gender;
    this._nationality = user.nationality;
    this._maritalStatus = user.maritalStatus;
    this._profession = user.profession;
    this._academicBackground = user.academicBackground;
    this._username = user.username;
    this._password = user.password;
  }

  get id(): number | undefined {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get name(): string | undefined {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get fullName(): string | undefined {
    return this._fullName;
  }
  set fullName(value: string) {
    this._fullName = value;
  }

  get email(): string | undefined  {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }

  get phone(): string | undefined {
    return this._phone;
  }
  set phone(value: string) {
    this._phone = value;
  }

  get birthDate(): Date | undefined {
    return this._birthDate;
  }
  set birthDate(value: Date) {
    this._birthDate = value;
  }

  get gender(): 'male' | 'female' | 'other' | 'not informed' | undefined {
    return this._gender;
  }
  set gender(value: 'male' | 'female' | 'other' | 'not informed') {
    this._gender = value;
  }

  get nationality(): string | undefined {
    return this._nationality;
  }
  set nationality(value: string) {
    this._nationality = value;
  }

  get maritalStatus(): 'single' | 'married' | 'divorced' | 'widowed' | 'other' | undefined {
    return this._maritalStatus;
  }
  set maritalStatus(
    value: 'single' | 'married' | 'divorced' | 'widowed' | 'other'
  ) {
    this._maritalStatus = value;
  }

  get profession(): string | undefined {
    return this._profession;
  }
  set profession(value: string | undefined) {
    this._profession = value;
  }

  get academicBackground(): string | undefined {
    return this._academicBackground;
  }
  set academicBackground(value: string | undefined) {
    this._academicBackground = value;
  }

  get username(): string | undefined {
    return this._username;
  }
  set username(value: string | undefined) {
    this._username = value;
  }

  get password(): string | undefined {
    return this._password;
  }
  set password(value: string | undefined) {
    this._password = value;
  }

  toJSON(): Partial<IUser> {
    return {
      id: this.id,
      name: this.name,
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      birthDate: this.birthDate,
      gender: this.gender,
      nationality: this.nationality,
      maritalStatus: this.maritalStatus,
      ...(this.profession !== undefined && { profession: this.profession }),
      ...(this.academicBackground !== undefined && { academicBackground: this.academicBackground }),
      ...(this.username !== undefined && { username: this.username }),
      ...(this.password !== undefined && { password: this.password }),
    };
  }
}
