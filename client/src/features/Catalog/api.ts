import type { Category, Record } from "./type";

export const fetchReocrdsLoad = async (): Promise<Record[]> => {
  const res = await fetch('api/records')
  const data = await res.json()
  return data.records
}

export const fetchRecordAdd = async (obj:FormData): Promise<Record> => {
  const res = await fetch('api/records', {
    method: 'post',
    body: obj,
  })
  const data = await res.json()
  return data.record
}

export const fetchCategoriesLoad = async (): Promise<Category[]> => {
  const res = await fetch('api/categories')
  const data = await res.json()
  return data.categories
}
