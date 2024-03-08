import React from 'react';
import type { OrderClose } from '../../Catalog/type';

function DeliveryItem({ delev }: { delev: OrderClose }): JSX.Element {
  return (
    <div>
      <div className="container-shop">
        <h2>{`Номер заказа: ${delev.id}`}</h2>
        <div>{`Общая стоимость заказа: ${delev.total_price}₽`}</div>
        <div>{`Статус: ${delev.status}`}</div>
        <div>{`Адрес: ${delev.Deliveries[0].adress}`}</div>
        <div>{`Дата доставки: ${delev.Deliveries[0].data}`}</div>
        <div>
          <h4>Купленый товар:</h4>
          {delev.OrderItems.map((el) => (
            <div>{el.Record.title}</div>
          ))}
          <h3 style={{color:'green'}}>{`Статус заказа: ${delev.status}`}</h3>
        </div>
      </div>
    </div>
  );
}

export default DeliveryItem;
