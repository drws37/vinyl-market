/* eslint-disable no-bitwise */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import type { RootState} from '../../../store/store';
import { useAppDispatch } from '../../../store/store'
import { shopLoad } from '../shopSlice'
import ShopItem from './ShopItem';
import { commentAddThunk, commentLoadThunk } from '../commentSlice';

function Shop():JSX.Element {
const shop = useSelector((store:RootState) => store.shop.shop)
const comments = useSelector((store:RootState) => store.comment.comment)
const [value, setComment] = useState()
const {userId} = useParams()
const dispatch = useAppDispatch()

const id = +userId




useEffect(() => {
  dispatch(shopLoad(id)).catch(console.log)
  dispatch(commentLoadThunk(id)).catch(console.log)

},[])

console.log(shop);

const commentAdd = (e:React.FormEvent<HTMLFormElement>):void => {
  e.preventDefault()
  const obj = {
    seller_id:shop.user.Seller.id,
    comment : value
  }
  dispatch(commentAddThunk(obj)).catch(console.log)

}




  return (
    
    <div>
      {
        comments.map((comment) => (
          <div>{comment.comment}</div>
        ))
      }
<div>{shop.user?.username}</div>
<div>{shop.user?.username}</div>
<form onSubmit={commentAdd}> 
  <input value={value} type="text" onChange={(e) => setComment(e.target.value)} />
  <button type='submit'>Оставить комменатрий</button>
</form>
<div className='container-order'>
{
    shop.record?.map((record) => <ShopItem key={record.id} record={record}/>)
}
</div>

    </div>
  )
}

export default Shop