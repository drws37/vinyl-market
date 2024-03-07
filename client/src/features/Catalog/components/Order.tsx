/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState }  from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal';
import type { RootState} from '../../../store/store';
import { useAppDispatch } from '../../../store/store'
import OrderItem from './OrderItem'
import '../styles/order.css'
import { clear, orderLoad } from '../ordersSlice';
import { deliveryAdd } from '../deliverySlice';


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




function Order():JSX.Element {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [firstname, setFirstname] = useState('')
  const [middlename, setMiddlename] = useState('')
  const [lastname, setLastname] = useState('')
  const [adress, setAdress] = useState('')
  const [phone, setPhone] = useState('')
  const [data, setData] = useState('')

  const openModal = (): void => {
    setIsOpen(true);
  };


  const closeModal = (): void => {
    setIsOpen(false);
  };
const orders = useSelector((store:RootState) => store.order.orders)

const dispatch = useAppDispatch();
useEffect(() => {
  dispatch(orderLoad()).catch(console.log);

}, []);

const id = orders[0]?.Order.id;


const addDelivery = (e:React.FormEvent<HTMLFormElement>):void => {
  e.preventDefault()
  const obj = {
    first_name:firstname,
    middle_name:middlename,
    last_name:lastname,
    adress,
    phone,
    data,
    order_id: id
  }

  dispatch(deliveryAdd(obj)).catch(console.log)
  dispatch(clear())
}


  return (


    <div className='container-order'>
  {orders.length > 0 ? 
    orders.map((order) => (
      <OrderItem key={order.id} order={order}/>
    )) : 
    <div className='order-text'>Ваша корзина пуста</div>
  }

  <button type="button" onClick={openModal}>
    Open Modal
  </button>

  <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <h2>Оплата заказа</h2>
    <div>{`Общая цена вашей корзины ${orders.length > 0 ? orders[0].Order.total_price : 0}₽`}</div>
    <form onSubmit={addDelivery}>
      <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" placeholder="Имя" />
      <input value={middlename} onChange={(e) => setMiddlename(e.target.value)} type="text" placeholder="Отчество" />
      <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" placeholder="Фамилия" />
      <input value={adress} onChange={(e) => setAdress(e.target.value)} type="text" placeholder="Адрес доставки" />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Номер телефона" />
      <input value={data} onChange={(e) => setData(e.target.value)} type="date" placeholder="Желаемая дата доставки" />
      <div>
        <button type="submit">Оплатить</button>
      </div>
    </form>
  </Modal>
</div>
  )
}

export default Order