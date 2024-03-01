import React from 'react'
import type { Record } from '../type'

const RecordItem = ({record}: {record: Record}): JSX.Element => {
  return (
    <div className='record__item'>
      <div className='record__item__img'>
        <img className='record__img' src={record.img} alt="record" />
      </div>
      <div className='record__item__info'>
        <h2 className='record__artist'>{record.artist}</h2>
        <h3 className='record__title'>{record.title}</h3>
        <p className='record__price'>{record.price} ₽</p>
        <button className='btn_favorite'>Сердечко</button>
        <button className='btn__more'>Подробнее</button>
      </div>
    </div>
  )
}

export default RecordItem