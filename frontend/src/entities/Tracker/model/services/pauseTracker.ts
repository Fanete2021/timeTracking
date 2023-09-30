import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from 'shared/api/api';
import { ITracker } from '../types/tracker';

export const pauseTracker = createAsyncThunk<ITracker, null, { rejectValue: string }>(
  'tracker/pauseTracker',
  async (_, thunkAPI) => {
    try {
      const response = await $api.post<ITracker>('/tracker/pause');

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);