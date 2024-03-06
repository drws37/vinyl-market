/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../../store/store';
import RecordItem from './RecordItem';
import FilteredList from './FilteredList';
import '../styles/input.css';
import { recordsLoad } from '../recordsSlice';

const RecordsList = (): JSX.Element => {
  const [value, setValue] = useState('`');

  const records = useSelector((store: RootState) => store.records.records);
  console.log(records);

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
          placeholder="Поиск"
          onChange={(e) => (e.target.value === '' ? setValue('`') : setValue(e.target.value))}
          className="search-input-size"
        />
        <div className="container-search">
          {filterVinil?.map((record) => <FilteredList key={record.id} record={record} />)}
        </div>
      </div>
      <Swiper spaceBetween={30} slidesPerView={5} onSlideChange={() => console.log('slide change')}>
        <div className="records__container">
          {records?.map(
            (record) =>
              record.status === true && (
                <SwiperSlide key={record.id}>
                  <RecordItem key={record.id} record={record} />
                </SwiperSlide>
              ),
          )}
        </div>
      </Swiper>
    </>
  );
};

export default RecordsList;
