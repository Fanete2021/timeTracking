import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from 'shared/api/api';
import { ITracker } from '../types/tracker';

export const startTracker = createAsyncThunk<ITracker, null, { rejectValue: string }>(
  'tracker/startTracker',
  async (_, thunkAPI) => {
    try {
      const response = await $api.post<ITracker>('/tracker/start');

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);