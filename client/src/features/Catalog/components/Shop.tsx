/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-bitwise */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from '../../../store/store';
import { useAppDispatch } from '../../../store/store';
import { shopLoad } from '../shopSlice';
import ShopItem from './ShopItem';
import { commentAddThunk, commentLoadThunk } from '../commentSlice';
import CommentItem from './CommentItem';
import '../styles/shopCard.css';

function Shop(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);
  const shop = useSelector((store: RootState) => store.shop.shop);
  const comments = useSelector((store: RootState) => store.comment.comment);
  const [value, setComment] = useState('');

  const { userId } = useParams();
  const dispatch = useAppDispatch();

  const id = userId;

  useEffect(() => {
    dispatch(shopLoad(id)).catch(console.log);
    dispatch(commentLoadThunk(id)).catch(console.log);
  }, []);

  const commentAdd = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const obj = {
      id: undefined,
      seller_id: shop.user.Seller.id,
      comment: value,
    };
    dispatch(commentAddThunk(obj)).catch(console.log);
  };

  return (
    <>
      <div className="container-shop">
        <div className="shop-name">{shop.user?.username}</div>
        <div className="shop-info">
          <p>{`Адрес: ${shop.user?.Seller.adress}`}</p>
          <p>{`Почта: ${shop.user?.email}`}</p>
          <p>{`Телефон: ${shop.user?.Seller.phone}`}</p>
          <p>{`ИНН: ${shop.user?.Seller.itn}`}</p>
        </div>
      </div>

      <div className="shop-container">
        <div className="shop-content">
          {shop.record
            ?.filter((record) => record.status !== false)
            .map((record) => <ShopItem key={record.id} record={record} />)}
        </div>
        <div className="container-input-comm">
          <h2>ОТЗЫВЫ</h2>
          {user && (
            <div className="input-wrapper">
              <form onSubmit={commentAdd}>
                <div className="input-container">
                  <input
                    className="input-comment"
                    value={value}
                    type="text"
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Оставить комментарий..."
                  />
                  <div className="button-container">
                    <button type="submit" className='btn-add'>
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title />
                        <g id="Complete">
                          <g data-name="add" id="add-2">
                            <g>
                              <line
                                fill="none"
                                stroke="#000000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                x1="12"
                                x2="12"
                                y1="19"
                                y2="5"
                              />
                              <line
                                fill="none"
                                stroke="#000000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                x1="5"
                                x2="19"
                                y1="12"
                                y2="12"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          <div className="container-comment">
            {comments?.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
