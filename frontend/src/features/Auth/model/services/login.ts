import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from 'shared/api/api';
import { User, userActions } from 'entities/User';

interface LoginProps {
  username: string;
  password: string;
}

export const login = createAsyncThunk<User, LoginProps, { rejectValue: string }>(
  'auth/login',
  async (authData, thunkAPI) => {
    try {
      const response = await $api.post<User>('/user/login', authData);

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(userActions.setUser(response.data));

      return response.data;
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        const message = data[0]?.msg || data?.message;

        return thunkAPI.rejectWithValue(`${message}`);
      }

      return thunkAPI.rejectWithValue('error');
    }
  }
);