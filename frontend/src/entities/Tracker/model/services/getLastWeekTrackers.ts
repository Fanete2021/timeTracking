import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from 'shared/api/api';
import { ITracker } from '../types/tracker';

export const getLastWeekTrackers = createAsyncThunk<ITracker[], null, { rejectValue: string }>(
  'tracker/getLastWeekTrackers',
  async (_, thunkAPI) => {
    try {
      const response = await $api.get<ITracker[]>('/tracker/getLastWeek');

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);