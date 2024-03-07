/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { authCheckUser } from '../features/Auth/authSlice';
import Login from '../features/Auth/components/Login';
import Registration from '../features/Auth/components/Registration';
import { categoriesLoad } from '../features/Catalog/categoriesSlice';
import CategoryPage from '../features/Catalog/components/CategoryPage';
import Favorite from '../features/Catalog/components/Favorite';
import Order from '../features/Catalog/components/Order';
import RecordPage from '../features/Catalog/components/RecordPage';
import Shop from '../features/Catalog/components/Shop';
import { favoriteLoad } from '../features/Catalog/favoriteSlice';
import { recordsLoad } from '../features/Catalog/recordsSlice';
import { songsLoad } from '../features/Catalog/songsSlice';
import Main from '../features/Main/Main';
import PreLoader from '../features/Main/PreLoader';
import MainPage from '../features/MainContent/MainPage';
import ProfilePage from '../features/Profile/components/ProfilePage';
import type { RootState } from '../store/store';
import { useAppDispatch } from '../store/store';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(recordsLoad()).catch(console.log);
    dispatch(categoriesLoad()).catch(console.log);
    dispatch(authCheckUser()).catch(console.log);
    dispatch(songsLoad()).catch(console.log);
  }, []);

  useEffect(() => {
    if (user !== null) {
      dispatch(favoriteLoad()).catch(console.log);
    }
  }, [user]);

  return loading ? (
    <PreLoader />
  ) : (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<MainPage />} />
        <Route path="order" element={<Order />} />
        <Route path="magazine/:userId" element={<Shop />} />
        <Route path="favorite" element={<Favorite />} />
        <Route path="sign-up" element={<Registration />} />
        <Route path="sign-in" element={<Login />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/records/:recordId" element={<RecordPage />} />
        <Route path="/categories/:categoryTitle" element={<CategoryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
