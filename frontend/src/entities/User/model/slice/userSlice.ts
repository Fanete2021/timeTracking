import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/userSchema';
import { checkAuth } from '../services/checkAuth';
import { logout } from '../services/logout';
import { deleteUser } from '../services/deleteUser';

const initialState: UserSchema = {
  user: {},
  isAuth: false
};

export const userSlice = createSlice({
  name: 'authResponse',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
      localStorage.setItem('token', action.payload.accessToken);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        localStorage.setItem('token', action.payload.accessToken);
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = {};
        state.isAuth = false;
        localStorage.removeItem('token');
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = {};
        state.isAuth = false;
        localStorage.removeItem('token');
      });
  }
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;