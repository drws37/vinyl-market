/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSelector } from 'react-redux';
import type { Comment } from '../type';
import { commentDelThunk } from '../commentSlice';
import type { RootState } from '../../../store/store';
import { useAppDispatch } from '../../../store/store';

function CommentItem({ comment }: { comment: Comment }): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);

  const dispatch = useAppDispatch();

  const commentDelete = (): void => {
    dispatch(commentDelThunk(comment.id)).catch(console.log);
  };

  return (
    <div className="comment">
      <h4 className="">{comment?.User?.username}</h4>
      <div className="comment-text">{comment?.comment}</div>
      {comment.User?.id === user?.id && (
        <button onClick={() => commentDelete()} className="delete-btn" type="button">
          <svg
            fill="#000000"
            width="15px"
            height="10px"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default CommentItem;
