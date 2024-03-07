/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { useAppDispatch } from '../../../store/store';
import type { Userr } from '../type';
import { authLogin } from '../authSlice';

const checkfild = object().shape({
  email: string().required('Необходимо указать электронную почту'),
  password: string().required('Необходимо указать пароль'),
});

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const message = useSelector((store: RootState) => store.auth.message);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Userr>({ resolver: yupResolver(checkfild) });

  const login: SubmitHandler<Userr> = (data: Userr) => {
    dispatch(authLogin(data)).catch(console.log);
    if (message === '') {
      navigate('/');
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-offset-3 col-md-6">
          <form className="form-horizontal" onSubmit={handleSubmit(login)}>
            <span className="heading">Войти</span>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="E-mail"
                {...register('email')}
              />
              <i className="fa fa-user" />
              <div className="color-er">{errors.email?.message}</div>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                {...register('password')}
              />
              <i className="fa fa-user" />
              <div className="color-er">{errors.password?.message}</div>
            </div>
            <div className="form-group help" />
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

export default Login;
