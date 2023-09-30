import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/Auth';
import { RegistrationSchema } from 'features/Registration';

export interface StateSchema {
  user: UserSchema;
  login: LoginSchema;
  registration: RegistrationSchema;
}