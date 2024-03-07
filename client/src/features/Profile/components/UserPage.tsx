/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from 'react';
import Modal from 'react-modal';
import type { User, UserAndId } from '../../Auth/type';
import { useAppDispatch } from '../../../store/store';
import { sellerAddInfo, sellerUpdateInfo } from '../../Catalog/shopSlice';
import '../styles/profile.css';

import '../../Catalog/styles/order.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
  }
};


function UserPage({ user }: { user: User | UserAndId | null }): JSX.Element {
  const dispatch = useAppDispatch();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen1, setIsOpen1] = useState(false);




  const [phone, setPhone] = useState('');
  const [adress, setAddres] = useState('');
  const [itn, setItn] = useState('');

  const addInfoSeller = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const obj = {
      phone,
      adress,
      itn,
      user_id: user?.id,
    };
    dispatch(sellerAddInfo(obj)).catch(console.log);
  };

  const updateInfoSeller = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const obj = {
      phone,
      adress,
      itn,
      user_id: user?.id,
    };
    dispatch(sellerUpdateInfo(obj)).catch(console.log);
  };


  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };
  const closeModal1 = (): void => {
    setIsOpen1(false);
  };

  const openModal11 = (): void => {
    setIsOpen1(true);
  };



  return (
    <div>
      {user?.role === 'seller' ? (



          <div>
          <div className="card">
              <img className="img-profile" src={user?.img} alt="" />
              <h1>{user?.username}</h1>
              <p className="title">{user?.email}</p>
            </div>
            <div className='user-btn'>
            <button className='btn-profile1' onClick={openModal} type="button">
            {' '}
            Заполнить данные о магазине
          </button>
          <button className='btn-profile1' onClick={openModal11} type="submit">
            {' '}
            Изменить данные о магазине
          </button>
          </div>
           
              
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h3>Заполните данные о магазине</h3>
              <form onSubmit={addInfoSeller}>
                <input
                 className='input-order1 modal-flex'
                  value={phone}
                  type="phone"
                  placeholder="Телефон"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                className='input-order1 modal-flex'
                  value={adress}
                  type="text"
                  placeholder="Адрес"
                  onChange={(e) => setAddres(e.target.value)}
                />
                <input
                className='input-order1 modal-flex'
                  value={itn}
                  type="text"
                  placeholder="ИНН"
                  onChange={(e) => setItn(e.target.value)}
                />
                <div className='button-profile-1'>
                <button className='button1' type="submit">Сохранить Данные</button>
                </div>
              </form>
              </Modal>

              <Modal
      isOpen={modalIsOpen1}
      onRequestClose={closeModal1}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h3>Обновите данные </h3>
              <form onSubmit={updateInfoSeller}>
                <input
                className='input-order1 modal-flex'
                  value={phone}
                  type="phone"
                  placeholder="Телефон"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                className='input-order1 modal-flex'
                  value={adress}
                  type="text"
                  placeholder="Адрес"
                  onChange={(e) => setAddres(e.target.value)}
                />
                <input
                className='input-order1 modal-flex'
                  value={itn}
                  type="text"
                  placeholder="ИНН"
                  onChange={(e) => setItn(e.target.value)}
                />
                <button className='button1' type="submit">Сохранить Данные</button>
              </form>


          </Modal>


          </div>

      ) : (

        <div className="card-div">
          <div className="card">
            <img className="img-profile" src={user?.img} alt="" />
            <h1>{user?.username}</h1>
            <p className="title">{user?.email}</p>
          </div>

        </div>
      )}
    </div>
  );
}

export default UserPage;
