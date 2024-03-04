import React from 'react'
import type { Favorite } from '../type'

function FavoriteItem({favorite}:{favorite:Favorite}):JSX.Element {
  console.log(favorite);
  
  return (
    <div>
      1
      <div>{favorite.Record.artist}</div>
    </div>
  )
}

export default FavoriteItem