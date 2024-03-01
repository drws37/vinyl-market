import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import type { RootState } from '../../../store/store';

function RecordPage(): JSX.Element {
  const { recordId } = useParams();
  const records = useSelector((store: RootState) => store.records.records);
  const currentRecord = recordId ? records.find((record) => record.id === +recordId) : undefined;

  return (
    <div>
      {currentRecord && (
        <>
          <div className="record-page_main">
            <div className="record-card_main">
              <div className="record-card_img">
                <img src={currentRecord?.img} alt="" />
              </div>
              <div className="record-card_info">{currentRecord?.artist}</div>
            </div>
          </div>
          <div className="records-page_same-artist">От того же исполнителя:</div>
        </>
      )}
    </div>
  );
}

export default RecordPage;
