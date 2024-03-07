/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { object, ref, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/form.css';
import { useSelector } from 'react-redux';
import { type RootState, useAppDispatch } from '../../../store/store';
import type { RegUser } from '../type';
import { authRegistration } from '../authSlice';

const checkfild = object().shape({
  username: string().required('Необходимо указать имя'),
  email: string().required('Необходимо указать электронную почту'),
  password: string()
    .required('Необходимо указать пароль')
    .min(8, 'Пароль должен быть более 8 символов')
    .max(25, 'Пароль должен быть не более 25 символов'),
  rpassword: string()
    .required('Необходимо подтвердить пароль')
    .min(8, 'Пароль должен быть более 8 символов')
    .max(25, 'Пароль должен быть не более 25 символов')
    .oneOf([ref('password')], 'Пароли не совпадают'),
  role: string().required('Необходимо указать роль'),
});

function Registration(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const message = useSelector((store: RootState) => store.auth.message);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegUser>({ resolver: yupResolver(checkfild) });

  const registration: SubmitHandler<RegUser> = (data: RegUser) => {
    dispatch(authRegistration(data)).catch(console.log);
    navigate('/');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-offset-3 col-md-6">
          <form className="form-horizontal" onSubmit={handleSubmit(registration)}>
            <span className="heading">Регистрация</span>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                {...register('username')}
              />
              <i className="fa fa-user" />
              <div className='color-er'>{errors.username?.message}</div>
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="E-mail"
                {...register('email')}
              />
              <i className="fa fa-user" />
              <div className='color-er'>{errors.email?.message}</div>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                {...register('password')}
              />
              <i className="fa fa-user" />
              <div className='color-er'>{errors.password?.message}</div>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repeat password"
                {...register('rpassword')}
              />
              <i className="fa fa-user" />
              <div className='color-er'>{errors.rpassword?.message}</div>
            </div>
            <div className="form-group help">
              <select {...register('role')}>
                <option value="buyer">Покупатель</option>
                <option value="seller">Магазин</option>
                <div className='color-er'>{errors.role?.message}</div>
              </select>
              <NavLink to="#" className="fa fa-question-circle" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-default">
                ВХОД
              </button>
            </div>
          </form>
          <div className="errRega err"> {message}</div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
