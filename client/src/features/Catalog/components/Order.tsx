
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../store/store'
import OrderItem from './OrderItem'
import '../styles/order.css'
import { orderLoad } from '../ordersSlice'

function Order():JSX.Element {
const orders = useSelector((store:RootState) => store.order.order)
console.log();
const dispatch = useAppDispatch();

console.log(orders);


useEffect(() => {
    dispatch(orderLoad()).catch(console.log);
},[])

  return (


    <div className='container-order'>
      {
        orders.map((order) => 
        <OrderItem key={order.id} order={order}/>)
      }

    </div>
  )
}

export default Order