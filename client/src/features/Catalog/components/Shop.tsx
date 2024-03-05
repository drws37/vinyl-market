import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import type { RootState} from '../../../store/store';
import { useAppDispatch } from '../../../store/store'
import { shopLoad } from '../shopSlice'
import ShopItem from './ShopItem';

function Shop():JSX.Element {
const shop = useSelector((store:RootState) => store.shop.shop)

const {userId} = useParams()
const dispatch = useAppDispatch()

useEffect(() => {
    dispatch(shopLoad(+userId)).catch(console.log)
},[])


  return (
    <div>
<div>{shop.user?.username}</div>
<div>{shop.user?.username}</div>
<div className='container-order'>
{
    shop.record?.map((record) => <ShopItem key={record.id} record={record}/>)
}
</div>

    </div>
  )
}

export default Shop