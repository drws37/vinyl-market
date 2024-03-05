/* eslint-disable import/prefer-default-export */
import type {UserSel} from "./type";

export const fetchSellerAdd = async (obj): Promise<UserSel> => {
    const res = await fetch(`/api/profile/${obj.user_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    console.log(data, 'PROFIIIILE');
    
    return data;
  };