/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css/bundle';

import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../../store/store';
import RecordItem from './RecordItem';
import FilteredList from './FilteredList';
import '../styles/input.css';
import '../styles/input.scss';

import { recordsLoad } from '../recordsSlice';

const RecordsList = (): JSX.Element => {
  const [value, setValue] = useState('`');

  const records = useSelector((store: RootState) => store.records.records);
  console.log(records);

  const lastAddedRecords = records.slice(0, 16).filter((record) => record.status === true);

  const filterVinil = records?.filter((record) =>
    record.title.toLowerCase().includes(value.toLowerCase()),
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(recordsLoad()).catch(console.log);
  }, []);

  return (
    <>
      <div className="container-serach-main">
        <input
        id="myInput" className="input-group__input search-input-size"
          placeholder="Поиск"
          onChange={(e) => (e.target.value === '' ? setValue('`') : setValue(e.target.value))}
        />
        <div className="container-search">
          {filterVinil?.map((record, idx) => <FilteredList idx={idx}  key={record.id} record={record} />)}
        </div>
      </div>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={4}
        slidesPerGroup={4}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={() => console.log('slide change')}
      >
        <div className="records__container">
          {lastAddedRecords.map((record) => (
            <SwiperSlide key={record?.id}>
              <RecordItem key={record?.id} record={record} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  );
};

export default RecordsList;
