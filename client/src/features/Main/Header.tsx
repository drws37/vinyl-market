/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';

// import '../main.css'
import { NavLink, useNavigate } from 'react-router-dom';
import './styles/nav.css';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../store/store';
import * as api from './api';
import { authLogout } from '../Auth/authSlice';
import { clear } from '../Catalog/ordersSlice';
import { clear2 } from '../Catalog/favoriteSlice';

function Header(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);
console.log(user,'888888')
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    await api.logoutFetch().then((data) => {
      if (data.message === 'success') {
        dispatch(authLogout()).catch(console.log);
        dispatch(clear());
        dispatch(clear2());
        navigate('/');
      }
    });
  };

  return (
    <nav className="nav">
      <div className="nav-bar">
        <NavLink to="/">LOGO</NavLink>

        {!user ? (
          <>
            <NavLink to="/sign-up">Регистрация</NavLink>
            <NavLink to="/sign-in">Вход</NavLink>
          </>
        ) : (
          <>
            <NavLink to={`/profile/${user?.id}`}>Профиль</NavLink>
            <NavLink to="/order">Корзина</NavLink>
            <NavLink to="/favorite">Избранное</NavLink>

            <NavLink onClick={handleLogout} to="/logout">
              Выйти
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
