/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch, type RootState } from '../../../store/store';
import * as api from '../api';
import { favoriteAdd } from '../favoriteSlice';
import '../styles/records.scss';
import '../styles/shopCard.css';

import type { Record } from '../type';

function RecordItem({ record }: { record: Record }): JSX.Element {
  const dispatch = useAppDispatch();

  const user = useSelector((store: RootState) => store.auth.user);

  const AddItemInOrder = async (): Promise<void> => {
    await api.fetchOrderAdd({ status: 'Корзина', id: record.id }).catch(console.log);
  };

  const AddFavoritre = async (id: number): Promise<void> => {
    dispatch(favoriteAdd(id)).catch(console.log);
  };

  return (
    <div className="record__item">
      <div className="record__item__img">
        <img className="record__img" src={record.img} alt="record" />
      </div>
      <div className="record__item__info">
        <h2 className="record__artist">{record.artist}</h2>
        <h3 className="record__title">{record.title}</h3>
        <p style={{fontSize:'16px'}} className="record__price">{`Цена: ${record.price}`} ₽</p>
        {user?.role === 'buyer' && (
          <button
            style={{ border: 'none', background: '#fafafa' }}
            type="button"
            onClick={() => {
              AddFavoritre(record.id);
            }}
            className="btn__favorite"
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="svg-favorite"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M46.1 2C39.8 2 34.5 5.6 32 10.8C29.5 5.6 24.2 2 17.9 2C9.2 2 2 9.4 2 17.9C2 32.4 32 62 32 62s30-29.6 30-44.1C62 9.4 54.8 2 46.1 2z"
              />
            </svg>
          </button>
        )}

        <Link
          onClick={() => window.scrollTo(0, 0)}
          className="btn__more"
          to={`/records/${record.id}`}
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
              
            >
            <path
              d="M3 10H21M3 14H21M3 18H21M3 6H21"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        {user?.role === 'buyer' && (
          <button
            style={{ border: 'none', background: 'white' }}
            type="button"
            className="btn__cart"
            onClick={AddItemInOrder}
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className='svg-order'
            >
              <path
                d="M3.5 4.5H5.05848C5.7542 4.5 6.10206 4.5 6.36395 4.68876C6.62584 4.87752 6.73584 5.20753 6.95585 5.86754L7.5 7.5"
                stroke="#222222"
                strokeLinecap="round"
              />
              <path
                d="M17.5 17.5H8.05091C7.90471 17.5 7.83162 17.5 7.77616 17.4938C7.18857 17.428 6.78605 16.8695 6.90945 16.2913C6.92109 16.2367 6.94421 16.1674 6.99044 16.0287V16.0287C7.04177 15.8747 7.06743 15.7977 7.09579 15.7298C7.38607 15.0342 8.04277 14.5608 8.79448 14.5054C8.8679 14.5 8.94906 14.5 9.11137 14.5H14.5"
                stroke="#222222"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.1787 14.5H11.1376C9.85836 14.5 9.21875 14.5 8.71781 14.1697C8.21687 13.8394 7.96492 13.2515 7.461 12.0757L7.29218 11.6818C6.48269 9.79294 6.07794 8.84853 6.52255 8.17426C6.96715 7.5 7.99464 7.5 10.0496 7.5H15.3305C17.6295 7.5 18.779 7.5 19.2126 8.24711C19.6462 8.99422 19.0758 9.99229 17.9352 11.9884L17.6517 12.4846C17.0897 13.4679 16.8088 13.9596 16.3432 14.2298C15.8776 14.5 15.3113 14.5 14.1787 14.5Z"
                stroke="#222222"
                strokeLinecap="round"
              />
              <circle cx="17" cy="20" r="1" fill="#222222" />
              <circle cx="9" cy="20" r="1" fill="#222222" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default RecordItem;
