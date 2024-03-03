/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { Link } from 'react-router-dom';
import type { Record } from '../type';
import '../styles/records.scss';
import * as api from '../api'

function RecordItem({ record }: { record: Record }): JSX.Element {

const AddItemInOrder = async():Promise<void> =>{
  await api.fetchOrderAdd({status:'Корзина', id:record.id}).catch(console.log)

}
  const scrollToTop = (): void => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="record__item">
      <div className="record__item__img">
        <img className="record__img" src={record.img} alt="record" />
      </div>
      <div className="record__item__info">
        <h2 className="record__artist">{record.artist}</h2>
        <h3 className="record__title">{record.title}</h3>
        <p className="record__price">{record.price} ₽</p>
        <button type="button" className="btn__favorite">
          Сердечко
        </button>
        <Link onClick={scrollToTop} className="btn__more" to={`/records/${record.id}`}>
          Подробнее
        </Link>
        <button type="button" className="btn__cart"  onClick={AddItemInOrder}>
          В корзину
        </button>
      </div>
    </div>
  );
}

export default RecordItem;
