export type Record = {
  id: number;
  title: string;
  artist: string;
  description: string;
  img: string;
  quality: string;
  price: number;
  spotifyId: string;
  RecordPrices: RecordPrice[];
};
export type RecordWithoutRecordPrice = Omit<Record, 'RecordPrices'>

export type Order = {
  id: number;
  order_id: number;
  record_id: number;
  price: number;
  count: number;
  Record: Record;
};

export type OrderItem = {
  id:number
  order_id:number
  record_id:number
  price:number
  count:number
  Record:Record
}



export type Favorite = {
  id:number
  user_id:number
  record_id:number
  Record:Record
}
export type FavoriteId = {
  id:number
}

export type OrderItemId = OrderItem['id'];

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

export type StateOrder = {
  orders: OrderItem[];
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

export type StateCategories = {
  categories: Category[];
  message: string | undefined;
};
