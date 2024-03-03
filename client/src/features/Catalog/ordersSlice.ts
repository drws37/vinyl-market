import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
// eslint-disable-next-line import/no-duplicates
import type { OrderItemId, StateOrder } from './type';
// eslint-disable-next-line import/no-cycle, import/no-duplicates


const initialState: StateOrder = {
  order: [],
  message: '',
};


export const orderAdd = createAsyncThunk('order/add', (obj:{id:number, status:string}) => api.fetchOrderAdd(obj));
export const orderLoad = createAsyncThunk('order/load', () => api.fetchOrdersLoad());
export const orderDelete = createAsyncThunk('order/delete', (id:OrderItemId) => api.fetchOrderDel(id))



const recordsSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(orderAdd.fulfilled, (state, action) => {state.order = action.payload})
    .addCase(orderAdd.rejected, (state, action) => {
      state.message = action.error.message
    })
    .addCase(orderLoad.fulfilled, (state, action) => {state.order = action.payload})
    .addCase(orderLoad.rejected, (state, action) => {state.message = action.error.message})
    .addCase(orderDelete.fulfilled, (state, action) => {state.order = state.order.filter((el) => el.Record.id !== action.payload.id)})
    .addCase(orderDelete.rejected, (state, action) => {state.message = action.error.message})
  }
})

export default recordsSlice.reducer;
