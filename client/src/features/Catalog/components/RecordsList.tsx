/* eslint-disable react/function-component-definition */
import React, { useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css' 

import { useSelector } from 'react-redux'
import type { RootState } from '../../../store/store'
import RecordItem from './RecordItem'

const RecordsList = (): JSX.Element => {

  const [value, setValue] = useState('')



  console.log(value);
  

  const records = useSelector((store: RootState) => store.records.records)

  const filterVinil = records.filter(record => 
    record.title.toLowerCase().includes(value.toLowerCase())
  )

  return (
    <>
    <div>
    <input placeholder='Поиск' onChange={(e) => setValue(e.target.value)} className='input-search'/>
    <div className='records__container'>
      {filterVinil.map((record) => (
        <RecordItem key={record.id} record={record} />
      ))}
    </div>
    </div>
    <Swiper
      spaceBetween={30}
      slidesPerView={5}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
    <div className='records__container'>
      {records.map((record) => (
      <SwiperSlide><RecordItem key={record.id} record={record} /></SwiperSlide> 
      ))}
    </div>
    </Swiper>
    </>

  )
}

export default RecordsList