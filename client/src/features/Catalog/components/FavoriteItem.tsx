import React from 'react'
import type { Favorite, FavoriteId } from '../type'
import { favoriteDelete } from '../favoriteSlice';
import { useAppDispatch } from '../../../store/store';

function FavoriteItem({favorite}:{favorite:Favorite}):JSX.Element {
  console.log(favorite);

const dispatch = useAppDispatch()
  const handleDelete =async (id:FavoriteId):Promise<void> => {
  
    dispatch(favoriteDelete(id)).catch(console.log)
  
  }
  
  return (
    <div className="product-item">
    <div className="product-list">
      <h3>{favorite.Record.artist}</h3>
        <img src={favorite.Record.img} alt="" />
        <span className="price">{favorite.Record.description}</span>
        <button type='button' onClick={() => {handleDelete(favorite.Record.id)}}  className="button">Дизлайк</button>
    </div>
  </div>
  )
}

export default FavoriteItem