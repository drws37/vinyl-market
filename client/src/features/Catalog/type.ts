export type UserComment = {
  email:string
  id:number
  img:string
  role:string
  username:string

}

export type Record = {
  user_id: number;
  id: number;
  title: string;
  artist: string;
  description: string;
  img: string;
  quality: string;
  price: number;
  spotifyId: string;
  status:boolean
  RecordPrices: RecordPrice[];
  Songs: Song[];
};
export type RecordWithoutRecordPrice = Omit<Record, 'RecordPrices'>;

export type Order = {
  id: number;
  order_id: number;
  record_id: number;
  total_price: number;
  count: number;
  Record: Record;
  Order: Order
};

export type OrderItemOrder = {
  id:number
  status:string
  total_price:number
  user_id:number

}
export type OrderItemm = {
  id: number;
  order_id: number;
  record_id: number;
  price: number;
  count: number;
  Record: Record;
  Order:OrderItemOrder
};

export type Favorite = {
  id: number;
  user_id: number;
  record_id: number;
  Record: Record;
};
export type FavoriteId = {
  id: number;
};

export type OrderItemId = OrderItemm['id'];

export type RecordId = Record['id'];

export type RecordPrice = {
  id: number;
  price: number;
  record_id: number;
  createdAt: string;
};

export type StateRecords = {
  records: Record[];
  message: string | undefined;
};

export type Song = {
  id: number;
  songTitle: string;
  duration: string;
  user_id: number
  record_id: number | undefined;
};

export type SongWithoutUser = {
  id: number;
  songTitle: string;
  duration: string;
  record_id: number | undefined;
};

export type SongWithoutId = {
  songTitle: string;
  duration: string;
  record_id: number | undefined;
};

export type Seller = {
  id: number;
  adress: string;
  itn: string;
  phone: string;
  user_id: string;
};

export type Shop = {
  id: number;
  email: string;
  role: string;
  username: string;
  Seller: Seller;
};

export type Comment = {
  id: number | undefined
  comment: string | undefined;
  seller_id: number;
  User?: UserComment

};

export type CommentFetch = {
  id: number | undefined
  comment: string | undefined;
  seller_id: number
  User:UserComment
  
};

export type ShopUser = {
  user: Shop;
  record: Record[];
};
export type ShopWithoutRecord = Omit<Shop, 'record'>;
export type SongId = Song['id'];

export type StateSongs = {
  songs: Song[];
  message: string | undefined;
};

export type StateOrder = {
  orders: OrderItemm[];
  message: string | undefined;
};

export type StateFavorite = {
  favorite: Favorite[];
  message: string | undefined;
};

export type Category = {
  id: number;
  title: string;
  Records?: Record[];
};

export type CategoryId = Category['id'];

export type StateCategories = {
  categories: Category[];
  message: string | undefined;
};

export type StateComment = {
  comment: Comment[];
  message: string | undefined;
};

export type StateShop = {
  shop: ShopUser;
  message: string | undefined;
};


export type StateDelivery = {
  delivery: OrderClose[]; // Исправлено на Deliverryy, не Deliverryy[]
  message: string | undefined;
}

export type Delivery = {
  first_name:string
  middle_name:string
  last_name:string
  adress:string
  phone:string
  data:string
  order_id:number | undefined
}

export type DeliveryWithoutOrederId = Omit<Delivery, 'order_id'>


export type Deliverryy = {
  id: number;
  user_id: number;
  total_price: number;
  status: string;
  Deliveries: Delivery[]; // Здесь используется массив Delivery, который содержит вложенные доставки
}
export type OrderClose ={
  id:number;
  status:string;
  total_price:number;
  Deliveries:Delivery[];
  OrderItems:OrderItemm[]
}