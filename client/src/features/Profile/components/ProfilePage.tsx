/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import '../styles/profile.css';
import UserPage from './UserPage';

function ProfilePage(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);

  const [content, setContent] = useState('personalData');

  return (
    <>
      <h1>ProfilePage</h1>
      <div className="profile_main">
        <div className="sidebar">
          <button type="button" onClick={() => setContent('personalData')}>
            <UserPage />
          </button>
          <button type="button" onClick={() => setContent('cart')}>
            Корзина
          </button>
          <button type="button" onClick={() => setContent('orders')}>
            Мои заказы
          </button>
          <button type="button" onClick={() => setContent('favorites')}>
            Избранное
          </button>
        </div>
        <div>
          {content === 'personalData' ? (
            <div>PERSONAL DATA</div>
          ) : content === 'cart' ? (
            <div>КОРЗИНА</div>
          ) : content === 'orders' ? (
            <div>ЗАКАЗЫ</div>
          ) : (
            <div>ИЗБРАННОЕ</div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
