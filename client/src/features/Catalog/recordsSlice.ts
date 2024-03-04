import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
// eslint-disable-next-line import/no-duplicates
import type { StateRecords } from './type';
// eslint-disable-next-line import/no-cycle, import/no-duplicates
import type { RecordId } from './type';




const initialState: StateRecords = {
  records: [],
  message: '',
};




export const recordsLoad = createAsyncThunk('records/load', () => api.fetchReocrdsLoad());
export const recordAdd = createAsyncThunk('records/add', (obj: FormData) => api.fetchRecordAdd(obj));
export const recordUpdate = createAsyncThunk('records/update', (obj: {id : RecordId | undefined, obj: FormData}) =>
  api.fetchRecordUpdate(obj),
)
export const recordRemove = createAsyncThunk('records/remove', (id: RecordId | undefined) => api.fetchRecordDelete(id))

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
    addCase(recordUpdate.fulfilled, (state, action) => {state.records = state.records.map((record) => record.id === action.payload.id ? action.payload : record)}).
    addCase(recordUpdate.rejected, (state, action) => {state.message = action.error.message}).
    addCase(recordRemove.fulfilled, (state, action) => {
      state.records = state.records.filter((record) => record.id !== action.payload);
    }).
    addCase(recordRemove.rejected, (state, action) => {state.message = action.error.message})
  }
})

export default recordsSlice.reducer;
