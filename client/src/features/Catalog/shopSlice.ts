import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { StateShop } from './type';
import * as api from './api';

const initialState: StateShop = {
  shop: [],
  message: '',
};

export const shopLoad = createAsyncThunk('shop/load', (id:number) => api.fetchShopLoad(id));

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(shopLoad.fulfilled, (state, action) => {
        state.shop = action.payload;
      })
      .addCase(shopLoad.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});

export default shopSlice.reducer;
