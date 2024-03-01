export type Record = {
  id: number;
  title: string;
  artist: string;
  description: string;
  img: string;
  quality: string;
  price: number;
};

export type RecordId = Record['id'];

export type StateRecords = {
  records: Record[];
  message: string | undefined;
};

export type Category = {
  id: number;
  title: string;
};

export type StateCategories = {
  categories: Category[];
  message: string | undefined;
};
