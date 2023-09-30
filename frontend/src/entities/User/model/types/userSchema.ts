export interface User {
  refreshToken?: string;
  accessToken?: string;
  data?: {
    user_id: number;
    username: string;
  };
}

export interface UserSchema {
  user?: User;
  isAuth: boolean;
}