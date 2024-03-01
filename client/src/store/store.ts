
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from '../features/Auth/authSlice';

import recordsSlice from '../features/Catalog/recordsSlice'

export const store = configureStore({
 reducer: {
    auth:authSlice
  records: recordsSlice
 },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
