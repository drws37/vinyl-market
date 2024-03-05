import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type {StateComment } from './type';
import * as api from './api';

const initialState: StateComment = {
  comment: [],
  message: '',
};

export const commentAddThunk = createAsyncThunk('comment/add', (obj:Comment) => api.fetchCommentAdd(obj));
export const commentLoadThunk = createAsyncThunk('comment/load', (id:number) => api.fetchCommentLoad(id));


const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(commentAddThunk.fulfilled, (state, action) => {
        state.comment = action.payload;
      })
      .addCase(commentAddThunk.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(commentLoadThunk.fulfilled, (state, action) => {
        state.comment = action.payload;
      })
      .addCase(commentLoadThunk.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});

export default commentSlice.reducer;
