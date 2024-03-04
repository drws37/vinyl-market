import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
// eslint-disable-next-line import/no-duplicates
import type { OrderItemId, StateFavorite } from './type';
// eslint-disable-next-line import/no-cycle, import/no-duplicates


const initialState: StateFavorite = {
  favorite: [],
  message: '',
};


export const favoriteAdd = createAsyncThunk('favorite/add', (id:number) => api.fetchFavotireAdd(id));



const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(favoriteAdd.fulfilled, (state, action) => {state.favorite = action.payload})
    .addCase(favoriteAdd.rejected, (state, action) => {state.message = action.error.message})
  }
})

export default favoriteSlice.reducer;
