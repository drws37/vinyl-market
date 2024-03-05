/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authSlice from '../features/Auth/authSlice';
import recordsSlice from '../features/Catalog/recordsSlice';
import categoriesSlice from '../features/Catalog/categoriesSlice';
import ordersSlice from '../features/Catalog/ordersSlice';
import favoriteSlice from '../features/Catalog/favoriteSlice';
import songsSlice from '../features/Catalog/songsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    records: recordsSlice,
    categories: categoriesSlice,
    order: ordersSlice,
    favorite: favoriteSlice,
    songs: songsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
