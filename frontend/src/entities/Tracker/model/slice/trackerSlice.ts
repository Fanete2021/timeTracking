import { createSlice } from '@reduxjs/toolkit';
import { TrackerSchema } from '../types/tracker';
import { getCurrentTracker } from '../services/getCurrentTracker';
import { getLastWeekTrackers } from '../services/getLastWeekTrackers';
import { startTracker } from '../services/startTracker';
import { pauseTracker } from '../services/pauseTracker';
import { finishTracker } from '../services/finishTracker';

const initialState: TrackerSchema = {
  trackers: null,
  currentTracker: null,
  isLoading: false
};

export const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    fullReset: (state) => {
      state.currentTracker = null;
      state.trackers = null;
      state.isLoading = false;
      state.error = undefined;
    },
    currentTrackerReset: (state) => {
      state.currentTracker = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentTracker.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getCurrentTracker.fulfilled, (state, action) => {
        state.currentTracker = action.payload;
        state.isLoading = false;
      })
      .addCase(getCurrentTracker.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getLastWeekTrackers.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getLastWeekTrackers.fulfilled, (state, action) => {
        state.trackers = action.payload;
        state.isLoading = false;
      })
      .addCase(getLastWeekTrackers.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(startTracker.fulfilled, (state, action) => {
        state.currentTracker = action.payload;
      })
      .addCase(pauseTracker.fulfilled, (state, action) => {
        state.currentTracker = action.payload;
      });
  }
});

export const { actions: trackerActions } = trackerSlice;
export const { reducer: trackerReducer } = trackerSlice;