import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RegUser, StateAuth, UserId, Userr } from './type';
import * as api from './api';
import * as logoutApi from '../Main/api';
import { fetchUpdateUser } from '../Profile/api';

const initialState: StateAuth = { user: null, message: '' };

export const authRegistration = createAsyncThunk('auth/registration', (obj: RegUser) =>
  api.registrationFetch(obj),
);

export const authLogin = createAsyncThunk('auth/login', (obj: Userr) =>
  api.loginFetch(obj),
);

export const authCheckUser = createAsyncThunk('auth/checkUser', () => api.checkUserFetch());

export const authLogout = createAsyncThunk('auth/logout', () => logoutApi.logoutFetch());

export const userUpdate = createAsyncThunk('user/update', (obj: {id: number | undefined, obj: FormData}) => fetchUpdateUser(obj))

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authRegistration.fulfilled, (state, action) => {
        state.user = action.payload;
        state.message = '';
      })
      .addCase(authRegistration.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.message = '';
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(authCheckUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.message = '';
      })
      .addCase(authCheckUser.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(authLogout.fulfilled, (state) => {
        state.user = null;
        state.message = '';
      })
      .addCase(authLogout.rejected, (state) => {
        state.message = 'logout error';
      }).
      addCase(userUpdate.fulfilled, (state, action) => {
        state.user = action.payload
      }).addCase(userUpdate.rejected, (state, action) => {state.message = action.error.message})
  },
});

export default authSlice.reducer;
