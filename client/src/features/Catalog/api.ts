/* eslint-disable import/no-duplicates */
import type { Category, Record, Song } from "./type";
// eslint-disable-next-line import/no-duplicates
import type { RecordId } from "./type";

export const fetchReocrdsLoad = async (): Promise<Record[]> => {
  const res = await fetch('/api/records')
  const data = await res.json()
  return data.records
}

export const fetchRecordAdd = async (obj:FormData): Promise<Record> => {
  const res = await fetch('/api/records', {
    method: 'post',
    body: obj,
  })
  const data = await res.json()
  return data.record
}

export const fetchCategoriesLoad = async (): Promise<Category[]> => {
  const res = await fetch('/api/categories')
  const data = await res.json()
  return data.categories
}


export const fetchRecordUpdate = async (obj:{id: RecordId | undefined, obj: FormData}): Promise<Record> => {
  const res = await fetch(`/api/records/${obj.id}`, {
    method: 'put',
    body: obj.obj,
  })
  const data = await res.json()
  return data
}

export const fetchRecordDelete = async (id: RecordId | undefined): Promise<RecordId> => {
  const res = await fetch(`/api/records/${id}`, {
    method: 'delete'
  })
  const data = await res.json()
  return data
}

export const fetchSongsLoad = async (): Promise<Song[]> => {
  const res = await fetch('/api/records/songs')
  const data = await res.json()
  return data.songs
}

export const fetchSongsAdd = async (formData: FormData): Promise<Song> => {
const res = await fetch('/api/records/songs', {
  method: 'post',
  body: formData,
})
const data = await res.json()
return data
}