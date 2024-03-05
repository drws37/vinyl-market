import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { StateShop } from './type';
import * as api from './api';
import * as apiShop from '../Profile/api';
import { SellerInfo } from '../Profile/type';


const initialState: StateShop = {
  shop: [],
  message: '',
};

export const shopLoad = createAsyncThunk('shop/load', (id:number) => api.fetchShopLoad(id));
export const sellerAddInfo = createAsyncThunk('seller/add', (obj:SellerInfo) => apiShop.fetchSellerAdd(obj));
export const sellerUpdateInfo = createAsyncThunk('seller/update', (obj:SellerInfo) => apiShop.fetchSellerUpdate(obj));

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
