import React from 'react'
import type { Delivery } from '../../Catalog/type'


function DeliveryItem({delev}:{delev:Delivery}):JSX.Element {



  return (
    <div>
      <div className="container-shop">
        <div>{`Фамилия: ${delev?.last_name}`}</div>
        <div>{`Имя: ${delev?.first_name}`}</div>
        <div>{`Отчество: ${delev?.middle_name}`}</div>
        <div>{`Телефон: ${delev?.phone}`}</div>
        <div>{`Адрес: ${delev?.adress}`}</div>
        <div>{`Дата доставки: ${delev?.data}`}</div>

      </div>




    </div>

  )
}

export default DeliveryItem