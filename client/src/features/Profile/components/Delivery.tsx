import React from 'react'
import type { OrderClose } from '../../Catalog/type'


function DeliveryItem({delev}:{delev:OrderClose}):JSX.Element {



  return (
    <div>
      <div className="container-shop">
      <div>{`Номер заказа: ${delev.id}`}</div>
        <div>{`Общая стоимость заказа: ${delev.total_price}₽`}</div>
        <div>{`Статус: ${delev.status}`}</div>
        <div>{`Адрес: ${delev.Deliveries[0].adress}`}</div>
        <div>{`Дата доставки: ${delev.Deliveries[0].data}`}</div>
<div>
  {
    delev.OrderItems.map(el=><div>{el.Record.title}</div>)
  }
</div>
      </div>




    </div>

  )
}

export default DeliveryItem