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


export type Order = {
  id:number
  order_id:number
  record_id:number
  price:number
  count:number
  Record:Record
};

export type OrderItem = {
  id:number
  order_id:number
  record_id:number
  price:number
  count:number
  Record:Record
}

export type OrderItemId = {
  id:number 
};
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
  order: OrderItem[];
  message: string | undefined;
};

export type StateFavorite = {
  favorite: Record;
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
