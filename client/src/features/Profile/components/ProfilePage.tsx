/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */

/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../../../store/store';
import { useAppDispatch } from '../../../store/store';
import FormAddRecord from '../../Catalog/components/FormAddRecord';
import '../styles/profile.css';
import UserPage from './UserPage';
import { authCheckUser } from '../../Auth/authSlice';

function ProfilePage(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);
  console.log(user, 'UUUUUUSSSSSSSSSEEEEEEERRRRRRRRR');

  const records = useSelector((store: RootState) => store.records.records);

  const [content, setContent] = useState('personalData');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authCheckUser()).catch(console.log);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <h1>ProfilePage</h1>
      <div className="profile_main">
        <div className="sidebar">
          <UserPage user={user} />
          {user && user.role === 'seller' && (
            <>
              <button type="button" onClick={() => setContent('products')}>
                Мои товары
              </button>
              <button type="button" onClick={() => setContent('personalData')}>
                Личные данные
              </button>
            </>
          )}
          {user && user.role === 'buyer' && (
            <>
              <button type="button" onClick={() => setContent('personalData')}>
                Личные данные
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
            </>
          )}
        </div>
        <div>
          {content === 'personalData' ? (
            <div>
              {user?.role === 'admin' ? (
                <div>
                  {records.map((record) => record.status === false && (
                    <div key={record.id}>
                      <img style={{ width: '200px' }} src={record.img} alt="" />
                      <div>
                        <h3>{record.title}</h3>
                        <h4>{record.artist}</h4>
                        <p>{record.description}</p>
                        <p>{record.quality}</p>
                        <p>{record.price} ₽</p>
                        <Link
                          onClick={scrollToTop}
                          className="btn__more"
                          to={`/records/${record.id}`}
                        >
                          Внести изменения
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>МАРК ВСТАВЬ СЮДА СЕЛЛЕРА И ЮЗЕРА</div>
              )}
            </div>
          ) : content === 'cart' ? (
            <div>КОРЗИНА</div>
          ) : content === 'orders' ? (
            <div>ЗАКАЗЫ</div>
          ) : content === 'products' ? (
            <div>
              <FormAddRecord />
              {records.map(
                (record) =>
                  record.user_id === user?.id && (
                    <div key={record.id}>
                      <img style={{ width: '200px' }} src={record.img} alt="" />
                      <div>
                        <h3>{record.title}</h3>
                        <h4>{record.artist}</h4>
                        <p>{record.description}</p>
                        <p>{record.quality}</p>
                        <p>{record.price} ₽</p>
                        <Link
                          onClick={scrollToTop}
                          className="btn__more"
                          to={`/records/${record.id}`}
                        >
                          Внести изменения
                        </Link>
                      </div>
                    </div>
                  ),
              )}
            </div>
          ) : (
            <div>ИЗБРАННОЕ</div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;