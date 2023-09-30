import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from 'shared/api/api';
import { ITracker } from '../types/tracker';

export const finishTracker = createAsyncThunk<ITracker, null, { rejectValue: string }>(
  'tracker/finishTracker',
  async (_, thunkAPI) => {
    try {
      const response = await $api.post<ITracker>('/tracker/finish');

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);