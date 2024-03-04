import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import type { RootState} from '../../../store/store';
import { useAppDispatch } from '../../../store/store';
import { favoriteLoad } from '../favoriteSlice';
import FavoriteItem from './FavoriteItem';


function Favorite():JSX.Element {


const favorites = useSelector((store:RootState) => store.favorite.favorite)

const dispatch = useAppDispatch();

useEffect(() => {
  dispatch(favoriteLoad()).catch(console.log);

}, []);


console.log(favorites, 12312312);



  return (
    <div>
        <div>{
            favorites.map((favorite) => <FavoriteItem key={favorite.id} favorite={favorite}/>)
            }</div>
    </div>
  )
}

export default Favorite