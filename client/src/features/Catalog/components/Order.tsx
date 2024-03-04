/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect }  from 'react'
import { useSelector } from 'react-redux'
import type { RootState} from '../../../store/store';
import { useAppDispatch } from '../../../store/store'
import OrderItem from './OrderItem'
import '../styles/order.css'
import { orderLoad } from '../ordersSlice';


function Order():JSX.Element {
const orders = useSelector((store:RootState) => store.order.orders)
console.log(orders);

const dispatch = useAppDispatch();

useEffect(() => {
  dispatch(orderLoad()).catch(console.log);

}, []);


  return (


    <div className='container-order'>
      {
        orders.length > 0 ?
        orders.map((order) => 
        <OrderItem key={order.id} order={order}/>)
        :
        <div>Ваша корзина пуста</div>
      }

    </div>
  )
}

export default Order