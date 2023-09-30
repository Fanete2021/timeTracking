import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/Auth';
import { RegistrationSchema } from 'features/Registration';
import { TrackerSchema } from 'entities/Tracker';

export interface StateSchema {
  user: UserSchema;
  login: LoginSchema;
  registration: RegistrationSchema;
  tracker: TrackerSchema;
}