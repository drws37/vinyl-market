/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import type { Favorite } from '../type';
import { favoriteDelete } from '../favoriteSlice';
import { useAppDispatch } from '../../../store/store';
import * as api from '../api';

function FavoriteItem({ favorite }: { favorite: Favorite }): JSX.Element {
  const dispatch = useAppDispatch();
  const handleDelete = async (id: number): Promise<void> => {
    dispatch(favoriteDelete(id)).catch(console.log);
  };

  const AddItemInOrder = async (): Promise<void> => {
    await api.fetchOrderAdd({ status: 'Корзина', id: favorite.Record.id }).catch(console.log);
  };

  return (
    <div className="product-item">
      <div className="product-list">
        <h3>{favorite.Record.artist}</h3>
        <img src={favorite.Record.img} alt="" />
        <span className="price">{favorite.Record.description}</span>
        <button
          type="button"
          onClick={() => {
            handleDelete(favorite.Record.id);
          }}
          className="button"
        >
          Дизлайк
        </button>
        <button type="submit" onClick={AddItemInOrder} className="button">
          В корзину
        </button>
      </div>
    </div>
  );
}

export default FavoriteItem;
