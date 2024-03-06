import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
// eslint-disable-next-line import/no-duplicates
import type {OrderItemId, StateOrder } from './type';
// eslint-disable-next-line import/no-cycle, import/no-duplicates


const initialState: StateOrder = {
  orders: [],
  message: '',
};


export const orderAdd = createAsyncThunk('order/add', (obj:{id:number, status:string}) => api.fetchOrderAdd(obj));
export const orderLoad = createAsyncThunk('order/load', () => api.fetchOrdersLoad());
export const orderDelete = createAsyncThunk('order/delete', (id:OrderItemId) => api.fetchOrderDel(id))



const recordsSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {clear:(state)=>{state.orders=[]}},
  extraReducers: (builder) => {
    builder
    .addCase(orderAdd.fulfilled, (state, action) => {state.orders = action.payload})
    .addCase(orderAdd.rejected, (state, action) => {
      state.message = action.error.message
    })
    .addCase(orderLoad.fulfilled, (state, action) => {
      if(action.payload.message === 'ok'){
        
        state.orders = action.payload.orders}
      }
        )
    .addCase(orderLoad.rejected, (state, action) => {state.message = action.error.message})
    .addCase(orderDelete.fulfilled, (state, action) => {
      state.orders = state.orders.filter((el) => el.Record.id !== +action.payload.id)
      state.orders = state.orders.map(el=>({...el, Order:{...el.Order,total_price:action.payload.order.total_price}}))
    })
    .addCase(orderDelete.rejected, (state, action) => {state.message = action.error.message})
  }
})
export const {clear} = recordsSlice.actions
export default recordsSlice.reducer;
