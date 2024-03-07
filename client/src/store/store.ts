/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authSlice from '../features/Auth/authSlice';
import recordsSlice from '../features/Catalog/recordsSlice';
import categoriesSlice from '../features/Catalog/categoriesSlice';
import ordersSlice from '../features/Catalog/ordersSlice';
import favoriteSlice from '../features/Catalog/favoriteSlice';
import songsSlice from '../features/Catalog/songsSlice';
import shopSlice from '../features/Catalog/shopSlice';
import commentSlice from '../features/Catalog/commentSlice';
import deliverySlice from '../features/Catalog/deliverySlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    records: recordsSlice,
    categories: categoriesSlice,
    order: ordersSlice,
    favorite: favoriteSlice,
    songs: songsSlice,
    shop: shopSlice,
    comment: commentSlice,
    delivery: deliverySlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
