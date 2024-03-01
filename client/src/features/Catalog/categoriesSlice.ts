import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { StateCategories } from './type';
import * as api from './api';

const initialState: StateCategories = {
  categories: [],
  message: '',
};

export const categoriesLoad = createAsyncThunk('categories/load', () => api.fetchCategoriesLoad());

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(categoriesLoad.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(categoriesLoad.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
