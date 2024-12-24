import { ModelState } from "@fynnc.models";

export interface IUser extends ModelState<IUser> {
  id?: number;
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  birthDate?: Date;
  gender?: 'male' | 'female' | 'other' | 'not informed';
  nationality?: string;
  maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed' | 'other';
  profession?: string;
  academicBackground?: string;
  username?: string;
  password?: string;
}
