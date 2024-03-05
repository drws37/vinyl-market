/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import Main from '../features/Main/Main';
import MainPage from '../features/MainContent/MainPage';
import { useAppDispatch } from '../store/store';
import { recordsLoad } from '../features/Catalog/recordsSlice';
import Registration from '../features/Auth/components/Registration';
import Login from '../features/Auth/components/Login';
import { authCheckUser } from '../features/Auth/authSlice';
import ProfilePage from '../features/Profile/components/ProfilePage';
import RecordPage from '../features/Catalog/components/RecordPage';
import { categoriesLoad } from '../features/Catalog/categoriesSlice';
import CategoryPage from '../features/Catalog/components/CategoryPage';
import Order from '../features/Catalog/components/Order';
import Favorite from '../features/Catalog/components/Favorite';
import { favoriteLoad } from '../features/Catalog/favoriteSlice';
import Shop from '../features/Catalog/components/Shop';


function App(): JSX.Element {
  const dispatch = useAppDispatch();


    

  useEffect(() => {
    dispatch(recordsLoad()).catch(console.log);
    dispatch(categoriesLoad()).catch(console.log);
    dispatch(authCheckUser()).catch(console.log);
    dispatch(favoriteLoad()).catch(console.log);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<MainPage />} />
        <Route path='order' element={<Order />} />
        <Route path='magazine/:userId' element={<Shop />} />

        <Route path='favorite' element={<Favorite />} />
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
