import React from 'react';
import { Link } from 'react-router-dom';
import type { Record } from '../type';

function FilteredList({ record, idx }: { record: Record; idx: number }): JSX.Element {
  return (
    <Link className="div-link-search" to={`/records/${record.id}`}>
      <div style={{ top: `${(idx + 1) * 60}px` }} className="input-search">
        <img className="img-record" src={record.img} alt="" />
        <div className="link-search">{record.title}</div>
        <div className="price">{record.price} ₽</div>
      </div>
    </Link>
  );
}

export default FilteredList;
