/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import type { Order, OrderItemId } from '../type'
import { useAppDispatch } from '../../../store/store'
import { orderDelete } from '../ordersSlice'

function OrderItem({order}: {order:Order}):JSX.Element {

  const dispatch = useAppDispatch()
  console.log(order,'oooorrrrder')

const handleDelete =async (id:OrderItemId):Promise<void> => {
  
  dispatch(orderDelete(id)).catch(console.log)

}
  return (
    <div className="product-item">
    <div className="product-list">
      <h3>{order.Record.artist}</h3>
        <img src={order.Record.img} alt="" />
        <span className="price">{`${order.price} ₽`}</span>
        <button type='button' onClick={() => {handleDelete(order.Record.id)}} className="button">Удалить из корзины</button>
    </div>
    
  </div>
  )
}

export default OrderItem