import { createAsyncThunk } from '@reduxjs/toolkit';
import { trackerActions } from 'entities/Tracker';
import $api from 'shared/api/api';

export const deleteUser = createAsyncThunk<void, null, { rejectValue: string }>(
  'user/deleteUser',
  async (_, thunkAPI) => {
    try {
      const response = await $api.delete('/user/delete');

      thunkAPI.dispatch(trackerActions.fullReset());

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);