import React from 'react'
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { object, ref, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom'
import '../styles/form.css'
import { useSelector } from 'react-redux';
import type { RootState } from '@reduxjs/toolkit/query';
import store, { useAppDispatch } from '../../../store/store';
import type { User, UserWithoutNameAndRpasswordAndRole } from '../type';
import { authLogin, authRegistration } from '../authSlice';

const checkfild = object().shape({
    email: string().required('Необходимо указать электронную почту'),
    password: string()
      .required('Необходимо указать пароль')
  });

function Login():JSX.Element {
const dispatch = useAppDispatch()

// const message = useSelector((store:RootState) => store.auth.message)


    const {
        register,
        handleSubmit,
        formState:{errors},
      
      } = useForm<UserWithoutNameAndRpasswordAndRole>({resolver: yupResolver(checkfild)})

      const login :SubmitHandler<UserWithoutNameAndRpasswordAndRole> = (data:UserWithoutNameAndRpasswordAndRole) => {
        dispatch(authLogin(data)).catch(console.log)
        }
  return (
    <div className="container">
 <div className="row">

 <div className="col-md-offset-3 col-md-6">
 <form className="form-horizontal" onSubmit={handleSubmit(login)}>
 <span className="heading">Войти</span>
 <div className="form-group">
 <input type="email" className="form-control" placeholder="E-mail" {...register('email')}/>
 <i className="fa fa-user" />
 <span>{errors.email?.message}</span>
 </div>
 <div className="form-group">
 <input type="password" className="form-control" placeholder="Password" {...register('password')}/>
 <i className="fa fa-user" />
 <span>{errors.password?.message}</span>

 </div>
 <div className="form-group help">
 </div>
 <div className="form-group">
 <button type="submit" className="btn btn-default">ВХОД</button>
 </div>
 </form>
 {/* <div className='errRega err'> {message}</div> */}
 </div>

 </div>
</div>
  )
}

export default Login