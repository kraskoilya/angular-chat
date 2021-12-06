import { User } from './user';

export interface AccessData {
  access_token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RecoveryRequest {
  access_token: string;
  password: string;
  password_confirmatin: string;
}

export interface RegistrationRequest {
  name: string;
  surname: string;
  company_name: string;
  country_id: number;
  date_of_birth: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirmRequest {
  code: string | number;
  password: string;
}
