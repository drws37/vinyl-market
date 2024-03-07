/* eslint-disable jsx-a11y/control-has-associated-label */
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
        style={{ border: 'none', background: 'white' }}
          type="button"
          onClick={() => {
            handleDelete(favorite.Record.id);
          }}
          className="button1 color"
        >
        <svg width="30px" height="30px" viewBox="0 0 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z" fill="#F44336" /><path d="M76.010667 136.448L136.32 76.117333l809.941333 809.941334-60.330666 60.330666z" fill="#37474F" /></svg>
        </button>
        <button type="submit" onClick={AddItemInOrder} className="button1" />
      </div>
    </div>
  );
}

export default FavoriteItem;
