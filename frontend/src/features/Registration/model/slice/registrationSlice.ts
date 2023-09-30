import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegistrationSchema } from '../types/registrationSchema';
import { registration } from '../services/registration';

const initialState: RegistrationSchema = {
  username: '',
  password: '',
  repeatedPassword: '',
  isLoading: false
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setRepeatedPassword: (state, action: PayloadAction<string>) => {
      state.repeatedPassword = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(registration.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

export const { actions: registrationActions } = registrationSlice;
export const { reducer: registrationReducer } = registrationSlice;