import React from 'react';

// import '../main.css'
import { NavLink } from 'react-router-dom';
import './styles/nav.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

function Header(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);
  console.log(user);

  return (
    <nav className="nav">
      <div className="nav-bar">
        <NavLink to="/">LOGO</NavLink>
        <input placeholder="Поиск" className="input-search" />
        <NavLink to="/">Избранное</NavLink>
        <NavLink to="/">Корзина</NavLink>
        <NavLink to={`/profile/${user?.id}`}>Профиль</NavLink>

        {!user ? (
          <>
            <NavLink to="/sign-up">Регистрация</NavLink>
            <NavLink to="/sign-in">Вход</NavLink>
          </>
        ) : (
          <NavLink to="/logout">Выйти</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Header;
