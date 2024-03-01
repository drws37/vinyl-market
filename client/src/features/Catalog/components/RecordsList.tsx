/* eslint-disable react/function-component-definition */
import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css' 

import { useSelector } from 'react-redux'
import type { RootState } from '../../../store/store'
import RecordItem from './RecordItem'

const RecordsList = (): JSX.Element => {

  const records = useSelector((store: RootState) => store.records.records)

  return (
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
  )
}

export default RecordsList