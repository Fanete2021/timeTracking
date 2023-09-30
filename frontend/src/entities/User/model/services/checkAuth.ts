import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from 'shared/api/api';
import { User } from '../types/UserSchema';

export const checkAuth = createAsyncThunk<User, null, { rejectValue: string }>(
  'user/checkAuth',
  async (_, thunkAPI) => {
    try {
      const response = await $api.get<User>('/user/refresh');

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);