import React from 'react';
import { Link } from 'react-router-dom';
import type { Record } from '../type';

function RecordPageSameItem({ sameRecord }: { sameRecord: Record }): JSX.Element {
  return (
    <Link
      onClick={() => window.scrollTo(0, 0)}
      to={`/records/${sameRecord.id}`}
      className="same_record"
    >
      <div className="same_record_img">
        <img src={sameRecord.img} alt="" />
      </div>
      <div className="same_record_info">
        <h3>{sameRecord.artist}</h3>
        <h3>{sameRecord.title}</h3>
        <div className="same_record_footer">
          <div className="same_record_footer_quality">
            <p>{sameRecord.quality}</p>
          </div>
          <p>{sameRecord.price} ₽</p>
        </div>
      </div>
    </Link>
  );
}

export default RecordPageSameItem;
