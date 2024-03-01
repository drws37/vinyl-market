import React from 'react';
import { Link } from 'react-router-dom';
import type { Record } from '../type';

function FilteredList({ record }: { record: Record }): JSX.Element {
  return (
    <Link className="div-link-search" to={`/records/${record.id}`}>
      <div className="input-search">
        <img className="img-record" src={record.img} alt="" />
        <div className="link-search">{record.title}</div>
      </div>
    </Link>
  );
}

export default FilteredList;
