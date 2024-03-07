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
import { authCheckUser, userUpdate } from '../../Auth/authSlice';
import { deliveryLoad } from '../../Catalog/deliverySlice';
import { orderLoad } from '../../Catalog/ordersSlice';
import DeliveryItem from './Delivery';
import type { RecordId } from '../../Catalog/type';
import { changeRecordStatus } from '../../Catalog/recordsSlice';
import '../styles/button.scss';

function ProfilePage(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);
  const records = useSelector((store: RootState) => store.records.records);
  const [content, setContent] = useState('personalData');
  const orders = useSelector((store: RootState) => store.order.orders);

  const dispatch = useAppDispatch();
  const id1 = orders[0]?.Order.id;
  useEffect(() => {
    setTimeout(() => {
      dispatch(orderLoad()).catch(console.log);
      dispatch(deliveryLoad(id1)).catch(console.log);
    });

    dispatch(authCheckUser()).catch(console.log);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo(0, 0);
  };
  const delivery = useSelector((store: RootState) => store.delivery.delivery);

  const updateRecordStatus = (id: RecordId): void => {
    dispatch(changeRecordStatus(id)).catch(console.log);
  };

  const [img, setImg] = useState<FileList | null | undefined>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const updateUserFetch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const imgFile = img?.[0];
    const formData = new FormData();
    formData.append('img', imgFile !== null && imgFile !== undefined ? imgFile : '');
    formData.append('username', username || '');
    formData.append('email', email || '');
    const data = {
      id: user?.id,
      obj: formData,
    };

    dispatch(userUpdate(data)).catch(console.log);
  };

  return (
    <div className="profile_main">
      <div className="sidebar">
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
            <button className="button" type="button" onClick={() => setContent('personalData')}>
              Личные данные
            </button>
            <button className="button" type="button" onClick={() => setContent('orders')}>
              Мои заказы
            </button>
          </>
        )}
      </div>
      <div>
        {content === 'personalData' ? (
          <div>
            {user?.role === 'admin' ? (
              <div>
                {records.map(
                  (record) =>
                    record.status === false && (
                      <div key={record.id}>
                        <img style={{ width: '200px' }} src={record.img} alt="" />
                        <div>
                          <h3>{record.title}</h3>
                          <h4>{record.artist}</h4>
                          <p>{record.description}</p>
                          <p>{record.quality}</p>
                          <p>{record.price} ₽</p>
                          <button
                            onClick={() => updateRecordStatus(record.id)}
                            className="btn__more"
                            type="button"
                          >
                            Одобрить
                          </button>
                        </div>
                      </div>
                    ),
                )}
              </div>
            ) : (
              <div>
                <div className="update__form__container">
                  <form className="update__form" onSubmit={updateUserFetch}>
                    <input
                      value={username}
                      placeholder="username"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                      value={email}
                      placeholder="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input placeholder="img" type="file" onChange={(e) => setImg(e.target.files)} />
                    <button type="submit">Добавить</button>
                  </form>
                </div>
                <div>
                  <img style={{ borderRadius: '50%', width: '200px' }} src={user?.img} alt="" />
                  <p> {user?.email}</p>
                  <p>{user?.username}</p>
                </div>
              </div>
            )}
          </div>
        ) : content === 'cart' ? (
          <div>КОРЗИНА</div>
        ) : content === 'orders' ? (
          <div>
            {delivery.map((el) => (
              <DeliveryItem key={el.id} delev={el} />
            ))}
          </div>
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
  );
}

export default ProfilePage;
