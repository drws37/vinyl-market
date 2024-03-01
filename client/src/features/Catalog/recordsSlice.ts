import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import type { StateRecords } from './type';

const initialState: StateRecords = {
  records: [],
  message: '',
};

export const recordsLoad = createAsyncThunk('records/load', () => api.fetchReocrdsLoad());
export const recordAdd = createAsyncThunk('records/add', (obj: FormData) =>
  api.fetchRecordAdd(obj),
);

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recordsLoad.fulfilled, (state, action) => {
        state.records = action.payload;
      })
      .addCase(recordsLoad.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});

export default recordsSlice.reducer;
