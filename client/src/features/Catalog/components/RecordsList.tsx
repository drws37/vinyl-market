/* eslint-disable react/function-component-definition */
import React from 'react'

import { useSelector } from 'react-redux'
import type { RootState } from '../../../store/store'
import RecordItem from './RecordItem'

const RecordsList = (): JSX.Element => {

  const records = useSelector((store: RootState) => store.records.records)

  return (
    <div className='records__container'>
      {records.map((record) => (
        <RecordItem key={record.id} record={record} />
      ))}
    </div>
  )
}

export default RecordsList