import type { User } from "../Auth/type"

export type SellerInfo = {
    phone:string
    addres:string
    itn:string
}

export type UserSeller = {
 user:User
 Seller:SellerInfo
}

export type UserSel = {
    username: string;
    email: string;
    password: string;
    rpassword: string;
    role: string;
    Seller:SellerInfo
}




export type StateSeller = {
    userSeller: UserSeller
    message: string | undefined;
  };

