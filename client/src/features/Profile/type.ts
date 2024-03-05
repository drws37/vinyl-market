

export type SellerInfo = {
    phone:string
    addres:string
    itn:string
    user_id:number
}

export type Message = {
message:string
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
    status: Message
    message: string | undefined;
  };

