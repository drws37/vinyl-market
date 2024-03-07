import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Comment, StateComment } from './type';
import * as api from './api';

const initialState: StateComment = {
  comment: [],
  message: '',
};

export const commentAddThunk = createAsyncThunk('comment/add', (obj: Comment) =>
  api.fetchCommentAdd(obj),
);
export const commentLoadThunk = createAsyncThunk('comment/load', (id: string | undefined) =>
  api.fetchCommentLoad(id),
);
export const commentDelThunk = createAsyncThunk('comment/delete', (id: number | undefined) =>
  api.fetchCommentDel(id),
);

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(commentAddThunk.fulfilled, (state, action) => {
        state.comment.push(action.payload.commentUser);
      })
      .addCase(commentAddThunk.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(commentLoadThunk.fulfilled, (state, action) => {
        state.comment = action.payload;
      })
      .addCase(commentLoadThunk.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(commentDelThunk.fulfilled, (state, action) => {
        state.comment = state.comment.filter((el) => el.id !== +action.payload);
      })
      .addCase(commentDelThunk.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});

export default commentSlice.reducer;
