export type Record = {
  id: number;
  title: string;
  artist: string;
  description: string;
  img: string;
  quality: string;
  price: number;
}

export type RecordId = Record['id']

export type StateRecords = {
  records: Record[],
  message: string | undefined
}