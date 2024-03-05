import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { StateShop } from './type';
import * as api from './api';
import * as apiShop from '../Profile/api';
import type { SellerInfo } from '../Profile/type';


const initialState: StateShop = {
  shop: {
    user: {
      id: 0,
      email: '',
      role: '',
      username: '',
      Seller: {
        id: 0,
        addres: '',
        itn: '',
        phone: '',
        user_id: ''
      }
    },
    record: []
  },
  message: '',
};

export const shopLoad = createAsyncThunk('shop/load', (id:string | undefined) => api.fetchShopLoad(id));
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
