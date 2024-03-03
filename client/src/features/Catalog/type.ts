export type Record = {
  id: number;
  title: string;
  artist: string;
  description: string;
  img: string;
  quality: string;
  price: number;
  spotifyId: string;
};

export type RecordId = Record['id'];

export type StateRecords = {
  records: Record[];
  message: string | undefined;
};

export type Song = {
  id: number;
  title: string;
  duration: string;
}

export type SongId = Song['id']

export type StateSongs = {
  songs: Song[];
  message: string | undefined
}

export type Category = {
  id: number;
  title: string;
  Records?: Record[];
};

export type CategoryId = Category['id']

export type StateCategories = {
  categories: Category[];
  message: string | undefined;
};
