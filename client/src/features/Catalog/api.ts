/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable import/no-duplicates */


import type {
  Category,
  Favorite,
  OrderItem,
  OrderItemId,
  Record,
  RecordId,
  Song,
  FavoriteId,
  ShopWithoutRecord,
  Comment,
  SongWithoutId,
  CommentFetch,
} from './type';

export const fetchReocrdsLoad = async (): Promise<Record[]> => {
  const res = await fetch('/api/records');
  const data = await res.json();
  return data.records;
};

export const fetchRecordAdd = async (obj: FormData): Promise<Record> => {
  const res = await fetch('/api/records', {
    method: 'post',
    body: obj,
  });
  const data = await res.json();
  return data.record;
};

export const fetchCategoriesLoad = async (): Promise<Category[]> => {
  const res = await fetch('/api/categories');
  const data = await res.json();
  return data.categories;
};

export const fetchRecordUpdate = async (obj: {
  id: RecordId | undefined;
  obj: FormData;
}): Promise<Record> => {
  const res = await fetch(`/api/records/${obj.id}`, {
    method: 'put',
    body: obj.obj,
  });
  const data = await res.json();
  return data;
};

export const fetchOrderAdd = async (obj: { id: number; status: string }): Promise<OrderItem[]> => {
  // console.log(obj, '1111');

  const res = await fetch(`/api/order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  });
  const data = await res.json();
  // console.log(data, 123123213321123);

  return data;
};

export const fetchOrdersLoad = async (): Promise<{ orders: OrderItem[]; message: string }> => {
  const res = await fetch('/api/order/order');
  const data = await res.json();
  return data;
};

export const fetchOrderDel = async (id: OrderItemId): Promise<OrderItemId> => {
  const res = await fetch(`/api/order/${id}`, { method: 'DELETE' });
  const data = await res.json();
  // console.log(data, 'ddddddaaaata');
  return data;
};

export const fetchRecordDelete = async (id: RecordId | undefined): Promise<RecordId> => {
  const res = await fetch(`/api/records/${id}`, {
    method: 'delete',
  });
  const data = await res.json();

  // console.log(data);
  return data;
};

export const fetchFavotireAdd = async (id: number): Promise<Favorite> => {
  const res = await fetch(`/api/favorite/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  const data = await res.json();
  // console.log(data);

  return data;
};

export const fetchFavoriteLoad = async (): Promise<Favorite[]> => {
  const res = await fetch('/api/favorite');
  const data = await res.json();
  // console.log(data, 123321);

  return data;
};

export const fetchFavoriteDelete = async (id: number): Promise<FavoriteId> => {
  const res = await fetch(`/api/favorite/item/${id}`, { method: 'DELETE' });
  const data = await res.json();
  // console.log(data, 'ddddddaaaata');
  return data;
};

export const fetchSongsLoad = async (): Promise<Song[]> => {
  const res = await fetch('/api/records/songs');
  const data = await res.json();
  return data.songs;
};

export const fetchSongsAdd = async (obj: { songs: SongWithoutId[] }): Promise<Song[]> => {
  const res = await fetch('/api/records/songs', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  const data = await res.json()
  console.log(data, 'asdasddsasdaasdasd9999');
  
  return data
  }

export const fetchShopLoad = async (id:string | undefined): Promise<{user:ShopWithoutRecord, record:Record[]}> => {
  const res = await fetch(`/api/magazine/${id}`);
  const data = await res.json();
  // console.log(data, "SHOPPPPPPPP");
  
  return data;
};

export const fetchCommentAdd = async (obj:Comment): Promise<{commentUser: CommentFetch}> => {
  const res = await fetch('/api/shop/comment', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  const data: {commentUser: CommentFetch} = await res.json() as {commentUser: CommentFetch}
  console.log(data, '123123123123123123123123123213');
  
  return data
  }

  
export const fetchCommentLoad = async (id:string | undefined): Promise<CommentFetch[]> => {
  const res = await fetch(`/api/shop/comments/${id}`);
  const data = await res.json();
  console.log(data, "Commentttttttttt");
  
  return data;
};

export const fetchCommentDel = async (id: number | undefined): Promise<{id:number}> => {
  const res = await fetch(`/api/shop/${id}`, { method: 'DELETE' });
  const data = await res.json();
  return data;
};

export const fetchChangeRecordStatus = async (id: number): Promise<RecordId> => {
  const res = await fetch(`/api/records/${id}/update`, {
    method: 'put',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      status: true,
    })
  })
  const data = await res.json()
  return data
}
