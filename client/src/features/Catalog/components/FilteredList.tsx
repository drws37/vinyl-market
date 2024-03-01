import React from 'react'
import { Link } from 'react-router-dom'

function FilteredList({record}):JSX.Element {



  return (
    <Link  className='div-link-search' to={`/records/${record.id}` }>
<div className='input-search' >
    <img className='img-record' src={record.img} alt="" />
    <Link  className='link-search'>{record.title}</Link>
</div>
</Link>



  )
}

export default FilteredList