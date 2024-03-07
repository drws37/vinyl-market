import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
// eslint-disable-next-line import/no-duplicates
import type {Delivery, StateDelivery } from './type';
// eslint-disable-next-line import/no-cycle, import/no-duplicates


const initialState: StateDelivery = {
  delivery: [],
  message: '',
}; 


export const deliveryAdd = createAsyncThunk('delivery/add', (obj:Delivery) => api.fetchDeliveryAdd(obj));
export const deliveryLoad = createAsyncThunk('delivery/load', (id:number) => api.fetchDeliveryLoad(id))
// export const favoriteDelete = createAsyncThunk('favorite/delete', (id:number) => api.fetchFavoriteDelete(id))




const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(deliveryAdd.fulfilled, (state, action) => {state.delivery.push(action.payload)})
    .addCase(deliveryAdd.rejected, (state, action) => {state.message = action.error.message})
    .addCase(deliveryLoad.fulfilled, (state, action) => {state.delivery = action.payload;})
    .addCase(deliveryLoad.rejected, (state, action) => {state.message = action.error.message})
    // .addCase(favoriteDelete.fulfilled, (state, action) => {state.favorite = state.favorite.filter((el) => el.Record.id !== +action.payload)})
    // .addCase(favoriteDelete.rejected, (state, action) => {state.message = action.error.message})
  }
})

export default deliverySlice.reducer;
