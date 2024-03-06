/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from 'react';
import type { User, UserAndId } from '../../Auth/type';

import { useAppDispatch } from '../../../store/store';
import { sellerAddInfo, sellerUpdateInfo } from '../../Catalog/shopSlice';

function UserPage({ user }: { user: User | UserAndId | null }): JSX.Element {
  const dispatch = useAppDispatch();

  const [phone, setPhone] = useState('');
  const [addres, setAddres] = useState('');
  const [itn, setItn] = useState('');
  const [addstate, setAddstate] = useState(false);
  const [updatestate, setUpdatestate] = useState(false);

  const addInfoSeller = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const obj = {
      phone,
      addres,
      itn,
      user_id: user?.id,
    };
    dispatch(sellerAddInfo(obj)).catch(console.log);
  };

  const updateInfoSeller = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const obj = {
      phone,
      addres,
      itn,
      user_id: user?.id,
    };
    dispatch(sellerUpdateInfo(obj)).catch(console.log);
  };


  return (
    <div>
      {user?.role === 'seller' ? (
        <>
          <button onClick={() => setAddstate((prev) => !prev)} type="submit">
            {' '}
            Заполнить данные о магазине
          </button>
          <button onClick={() => setUpdatestate((prev) => !prev)} type="submit">
            {' '}
            Изменить данные о магазине
          </button>

          <div>
            {addstate && (
              <form onSubmit={addInfoSeller}>
                <input
                  value={phone}
                  type="phone"
                  placeholder="Телефон"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  value={addres}
                  type="text"
                  placeholder="Адрес"
                  onChange={(e) => setAddres(e.target.value)}
                />
                <input
                  value={itn}
                  type="text"
                  placeholder="ИНН"
                  onChange={(e) => setItn(e.target.value)}
                />
                <button type="submit">Сохранить Данные</button>
              </form>
            )}

            {updatestate && (
              <form onSubmit={updateInfoSeller}>
                <input
                  value={phone}
                  type="phone"
                  placeholder="Телефон"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  value={addres}
                  type="text"
                  placeholder="Адрес"
                  onChange={(e) => setAddres(e.target.value)}
                />
                <input
                  value={itn}
                  type="text"
                  placeholder="ИНН"
                  onChange={(e) => setItn(e.target.value)}
                />
                <button type="submit">Сохранить Данные</button>
              </form>
            )}
            <div>{user?.username}</div>
            <div>{user?.email}</div>
          </div>
        </>
      ) : (
        <div>
          <div>{user?.username}</div>
          <div>{user?.email}</div>
        </div>
      )}
    </div>
  );
}

export default UserPage;
