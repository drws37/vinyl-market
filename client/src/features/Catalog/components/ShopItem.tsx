import React from 'react';
import { Link } from 'react-router-dom';
import type { Record } from '../type';

function ShopItem({ record }: { record: Record }): JSX.Element {
  return (
    <div className="product-item">
      <Link to={`/records/${record.id}`}>
        <div className="product-list">
          <h3>{record.artist}</h3>
          <img src={record.img} alt="" />
          <span className="price">{record.price} ₽</span>
        </div>
      </Link>
    </div>
  );
}

export default ShopItem;
