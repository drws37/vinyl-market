import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import type { RecordId, Song, StateSongs } from './type';

const initialState: StateSongs = {
  songs: [],
  message: '',
}

export const songsAdd = createAsyncThunk('songs/add', async (obj: { songs: Song[] }) => api.fetchSongsAdd(obj))
export const songsLoad = createAsyncThunk('songs/load', () => api.fetchSongsLoad())

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.
    addCase(songsLoad.fulfilled, (state, action) => {
      state.songs = action.payload
    }).addCase(songsLoad.rejected, (state, action) => {
      state.message = action.error.message
    }).
    addCase(songsAdd.fulfilled, (state, action) => {state.songs = [...state.songs, ...action.payload]}).
    addCase(songsAdd.rejected, (state, action) => {state.message = action.error.message})
  }
})

export default songsSlice.reducer