/* eslint-disable import/prefer-default-export */
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
    const res = await fetch(`/api/profile/update/${obj.user_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    console.log(data, 'PROFIIIILE');
    
    return data;
  };