import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import type { StateRecords } from './type';
// eslint-disable-next-line import/no-cycle
import { fetchRecordUpdate } from './components/RecordPage';

const initialState: StateRecords = {
  records: [],
  message: '',
};

export const recordsLoad = createAsyncThunk('records/load', () => api.fetchReocrdsLoad());
export const recordAdd = createAsyncThunk('records/add', (obj: FormData) =>
  api.fetchRecordAdd(obj),
);
export const recordUpdate = createAsyncThunk('records/update', (obj: FormData) =>
  fetchRecordUpdate(obj),
)

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.
    addCase(recordsLoad.fulfilled, (state, action) => {state.records = action.payload}).
    addCase(recordsLoad.rejected, (state, action) => {state.message = action.error.message}).
    addCase(recordAdd.fulfilled, (state, action) => {state.records.unshift(action.payload)}).
    addCase(recordAdd.rejected, (state, action) => {state.message = action.error.message}).
    addCase(recordUpdate.fulfilled, (state, action) => {state.records.map((record) => record.id === action.payload.id ? action.payload : record)}).
    addCase(recordUpdate.rejected, (state, action) => {state.message = action.error.message})
  }
})

export default recordsSlice.reducer;
