import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import recordsSlice from '../features/Catalog/recordsSlice'




export const store = configureStore({
 reducer: {
  records: recordsSlice
 },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;