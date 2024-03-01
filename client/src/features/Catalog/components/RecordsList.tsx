/* eslint-disable react/function-component-definition */
import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import type { RootState } from '../../../store/store'
import RecordItem from './RecordItem'

const RecordsList = (): JSX.Element => {

  const [value, setValue] = useState('')



  console.log(value);
  

  const records = useSelector((store: RootState) => store.records.records)

  const filterVinil = records.filter(record => {
    return record.title.toLowerCase().includes(value.toLowerCase())
  })

  return (

    <div>

    <input placeholder='Поиск' onChange={(e) => setValue(e.target.value)} className='input-search'/>

    <div className='records__container'>
      {filterVinil.map((record) => (
        <RecordItem key={record.id} record={record} />
      ))}
    </div>
    </div>
  )
}

export default RecordsList