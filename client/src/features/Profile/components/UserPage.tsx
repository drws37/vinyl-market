import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import type { User } from '../../Auth/type';
import type { SellerInfo } from '../type';
import { useAppDispatch } from '../../../store/store';
import { sellerAddInfo } from '../profileSlice';

function UserPage({user} : {user:User}):JSX.Element {
  const dispatch = useAppDispatch()
  const {userId} = useParams()
  const id = +userId
  const [phone, setPhone] = useState('');
  const [addres, setAddres] = useState('');
  const [itn, setItn] = useState('');

  

const addInfoSeller = (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const obj = {
    phone,
    addres,
    itn,
    user_id:id
  }
  dispatch(sellerAddInfo(obj)).catch(console.log)
  
}


  return (
<div>

{
   user?.role === 'seller' ? 
  <div>
  <form action="" onSubmit={addInfoSeller}>
    <input value={phone} type="phone" placeholder='Телефон' onChange={(e)=> setPhone(e.target.value)}/>
    <input value={addres} type="text" placeholder='Адрес'  onChange={(e)=> setAddres(e.target.value)}/>
    <input value={itn} type="text" placeholder='ИНН' onChange={(e)=> setItn(e.target.value)} />
    <button type='submit'>Сохранить Данные</button>
  </form>
  <div>{user?.username}</div>
  <div>{user?.email}</div>

</div>
  :
  <div>
  <div>{user?.username}</div>
  <div>{user?.email}</div>
  </div>
}
</div>

  )
}

export default UserPage