import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type {StateSeller } from './type';
import * as api from './api'

const initialState: StateSeller = {
  userSeller: [],
  message: '',
};

export const sellerAddInfo = createAsyncThunk('seller/add', (obj) => api.fetchSellerAdd(obj));

const profileSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sellerAddInfo.fulfilled, (state, action) => {
        state.userSeller = action.payload;
      })
      .addCase(sellerAddInfo.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});

export default profileSlice.reducer;
