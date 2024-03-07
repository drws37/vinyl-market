/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { RootState } from '../../../store/store';
import { useAppDispatch } from '../../../store/store';
import OrderItem from './OrderItem';
import '../styles/order.css';
import { clear, orderLoad } from '../ordersSlice';
import { deliveryAdd } from '../deliverySlice';
import type { DeliveryWithoutOrederId } from '../type';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};



const checkField = object().shape({
  first_name: string().required('Необходимо указать имя'),
  last_name: string().required('Необходимо указать фамилию'),
  middle_name: string().required('Необходимо указать фамилию'),
  adress: string().required('Необходимо указать фамилию'),
  phone: string().required('Необходимо указать номер телефона'),
  data: string().required('Необходимо указать желаемую дату доставки'),
});

function Order(): JSX.Element {
  const [modalIsOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(checkField) });

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const orders = useSelector((store: RootState) => store.order.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(orderLoad()).catch(console.log);
  }, []);

  const id = orders[0]?.Order.id;

  const addDelivery = (formData: DeliveryWithoutOrederId): void => {
    const dataWithOrderId = { ...formData, order_id: id };
    dispatch(deliveryAdd(dataWithOrderId)).catch(console.log);
    dispatch(clear());
    // reset()
  };

  return (
    <div className="container-order">
      {orders.length > 0 ? (
        <>
          <div className="container-order-card">
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
          <button type="button" onClick={openModal}>
            Open Modal
          </button>
        </>
      ) : (
        <div className="order-text">Ваша корзина пуста</div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Оплата заказа</h2>
        <form onSubmit={handleSubmit(addDelivery)}>
          <div className="modal-container-input">
            <input
              className="input-order"
              {...register('first_name')}
              type="text"
              placeholder="Имя"
            />
            {errors.first_name && <p>{errors.first_name.message}</p>}
            <input
              className="input-order"
              {...register('middle_name')}
              type="text"
              placeholder="Отчество"
            />
            {errors.middle_name && <p>{errors.middle_name.message}</p>}
            <input
              className="input-order"
              {...register('last_name')}
              type="text"
              placeholder="Фамилия"
            />
            {errors.last_name && <p>{errors.last_name.message}</p>}
            <input
              className="input-order"
              {...register('adress')}
              type="text"
              placeholder="Адрес доставки"
            />
            {errors.adress && <p>{errors.adress.message}</p>}
            <input
              className="input-order"
              {...register('phone')}
              type="text"
              placeholder="Номер телефона"
            />
            {errors.phone && <p>{errors.phone.message}</p>}
            <input
              className="input-order"
              {...register('data')}
              type="date"
              placeholder="Желаемая дата доставки"
            />
            {errors.data && <p>{errors.data.message}</p>}
            <div className="btn-modal">
              {orders.length > 0 ? (
                <button
                  className="button"
                  type="submit"
                >{`Оплатить: ${orders.length > 0 ? orders[0].Order.total_price : 0}₽`}</button>
              ) : (
                <div className="color-accpet-order">Ваш заказ успешно отправлен!</div>
              )}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Order;
