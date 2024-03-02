import React from 'react'
import RecordsList from '../Catalog/components/RecordsList'
import FormAddRecord from '../Catalog/components/FormAddRecord'

function MainPage():JSX.Element {
  return (
    <>
<div><FormAddRecord/></div>
    <div>
      <RecordsList/>
      </div>
      </>
  )
}

export default MainPage