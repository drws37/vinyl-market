/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import type { Order, OrderItemId } from '../type'
import * as api from '../api'

function OrderItem({order}: {order:Order}):JSX.Element {

const handleDelete =async (id:OrderItemId):Promise<void> => {
  await api.fetchOrderDel(id).catch(console.log)
  

}



  return (
    <div className="product-item">

    <div className="product-list">
      <h3>{order.Record.artist}</h3>
        <img src={order.Record.img} alt="" />
        <span className="price">{`${order.price} ₽`}</span>
        <button type='button' onClick={() => handleDelete(order.Record.id)} className="button">Удалить</button>
    </div>
    
  </div>
  )
}

export default OrderItem