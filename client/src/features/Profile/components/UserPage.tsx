import React from 'react'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';

function UserPage():JSX.Element {

    const user = useSelector((store: RootState) => store.auth.user);


  return (

    <div>
        {
            user && 
            <div>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>{user.role}</div>
            </div>

            
        }
    </div>

  )
}

export default UserPage