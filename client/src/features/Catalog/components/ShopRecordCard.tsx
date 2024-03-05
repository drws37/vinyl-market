import React from 'react'
import { Link } from 'react-router-dom'
import type { Record } from '../type'

function ShopRecordCard({record}: {record:Record}):JSX.Element {
  return (
    <div className="record__item">
    <div className="record__item__img">
      <img className="record__img" src={record.img} alt="record" />
    </div>
    <div className="record__item__info">
      <h2 className="record__artist">{record.artist}</h2>
      <h3 className="record__title">{record.title}</h3>
      <p className="record__price">{record.price} ₽</p>
      <button type="button"  className="btn__favorite">
        Сердечко
      </button>
      <Link  className="btn__more" to={`/records/${record.id}`}>
        Подробнее
      </Link>
      <button type="button" className="btn__cart" >
        В корзину
      </button>
    </div>
  </div>
  )
}

export default ShopRecordCard