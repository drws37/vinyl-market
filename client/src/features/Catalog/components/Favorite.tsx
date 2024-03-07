/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { useAppDispatch } from '../../../store/store';
import { favoriteLoad } from '../favoriteSlice';
import FavoriteItem from './FavoriteItem';

function Favorite(): JSX.Element {
  const favorites = useSelector((store: RootState) => store.favorite.favorite);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(favoriteLoad()).catch(console.log);
  }, []);

  return (
    <div className="container-order">
      {favorites.map((favorite) => (
        <FavoriteItem key={favorite.id} favorite={favorite} />
      ))}
    </div>
  );
}

export default Favorite;
