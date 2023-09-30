import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/userSchema';
import { checkAuth } from '../services/checkAuth';
import { logout } from '../services/logout';
import { deleteUser } from '../services/deleteUser';

const initialState: UserSchema = {
  user: {}
};

export const userSlice = createSlice({
  name: 'authResponse',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem('token', action.payload.accessToken);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('token', action.payload.accessToken);
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = {};
        localStorage.removeItem('token');
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = {};
        localStorage.removeItem('token');
      });
  }
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;