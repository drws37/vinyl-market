/* eslint-disable import/prefer-default-export */
import { User } from "../Auth/type";
import type {SellerInfo} from "./type";

export const fetchSellerAdd = async (obj:SellerInfo): Promise<{message:string}> => {
    const res = await fetch(`/api/profile/${obj.user_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    console.log(data, 'PROFIIIILE');
    
    return data;
  };

  export const fetchSellerUpdate = async (obj:SellerInfo): Promise<{message:string}> => {
    const res = await fetch(`/api/auth/update/${obj.user_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    console.log(data, 'PROFIIIILE');
    
    return data;
  };

  export const fetchUpdateUser = async (obj: {id: number | undefined, obj: FormData}): Promise<User> => {
    const res = await fetch(`/api/auth/update/${obj.id}`, {
      method: 'put',
      body: obj.obj
    })
    const data = await res.json()
    return data
  }