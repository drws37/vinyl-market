/* eslint-disable jsx-a11y/alt-text */
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
    <nav className="page__menu page__custom-settings menu">
      <ul className="menu__list r-list">
      <li className="menu__group"><NavLink to='/'><img className='logo' src='/MarketLogoBlack.png' alt="" /></NavLink></li>
        {!user ? (
          <>
            <li className="menu__group"><NavLink className='menu__link r-link text-underlined' to="/sign-up">Регистрация</NavLink></li>
            <li className="menu__group"> <NavLink className='menu__link r-link text-underlined' to="/sign-in">Вход</NavLink></li>
          </>
        ) : (
          <>
           <li className="menu__group">  <NavLink className='menu__link r-link text-underlined' to="/order">Корзина</NavLink></li>
           <li className="menu__group"> <NavLink className='menu__link r-link text-underlined' to={`/profile/${user?.id}`}>Профиль</NavLink></li>
           <li className="menu__group"><NavLink className='menu__link r-link text-underlined' to="/favorite">Избранное</NavLink></li>

           <li className="menu__group">  <NavLink className='menu__link r-link text-underlined' onClick={handleLogout} to="/logout">
              Выйти
            </NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
