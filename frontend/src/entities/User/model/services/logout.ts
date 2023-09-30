import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from 'shared/api/api';
import { trackerActions } from 'entities/Tracker';

export const logout = createAsyncThunk<void, null, { rejectValue: string }>(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      const response = await $api.post('/user/logout');

      thunkAPI.dispatch(trackerActions.fullReset());

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);