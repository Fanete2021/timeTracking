import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from 'shared/api/api';

export const deleteUser = createAsyncThunk<void, null, { rejectValue: string }>(
  'user/deleteUser',
  async (_, thunkAPI) => {
    try {
      const response = await $api.delete('/user/delete');

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);