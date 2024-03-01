import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

function ProfilePage(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);

  return (
    <>
      <div>ProfilePage</div>
      <div>{user?.username}</div>
    </>
  );
}

export default ProfilePage;
