import {SkiPass} from '.';

export type UserType = {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  location?: string;
  skiPass?: SkiPass;
  phoneNumber?: string;
  otp?: string;
  phoneVerified?: boolean;
  emailVerified?: boolean;
};
export type TokenType = {
  jwt?: string;
  refreshToken?: string;
};
