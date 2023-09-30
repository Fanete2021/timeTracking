import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import $api from 'shared/api/api';

interface RegistrationProps {
  username: string;
  password: string;
}

export const registration = createAsyncThunk<User, RegistrationProps, { rejectValue: string }>(
  'auth/registration',
  async (authData, thunkAPI) => {
    try {
      const response = await $api.post<User>('/user/registration', authData);

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