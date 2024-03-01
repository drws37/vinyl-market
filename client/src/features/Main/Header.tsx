import React from 'react'

// import '../main.css'
import { NavLink } from 'react-router-dom'
import './styles/nav.css'



function Header():JSX.Element {
// const user = useSelector((store:RootState)=>store.auth.user)
  return (
    <nav className='nav'>
        <div className='nav-bar'>
        <NavLink to='/'>LOGO</NavLink>
        <input placeholder='Поиск' className='input-search'/>
        <NavLink to='/'>Избранное</NavLink>
        <NavLink to='/'>Корзина</NavLink>
        <NavLink to='/'>Профиль</NavLink>
        <NavLink to='/sign-up'>Регистрация</NavLink>
        <NavLink to='/sign-up'>Вход</NavLink>


        </div>
    </nav>
  )
}

export default Header