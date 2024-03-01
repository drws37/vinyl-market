import type { Record } from "./type";

export const fetchReocrdsLoad = async (): Promise<Record[]> => {
  const res = await fetch('api/records')
  const data = await res.json()
  return data.records
}

export const fetchRecordAdd = async (obj:FormData): Promise<Record> => {
  const res = await fetch('api/records', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: obj,
  })
  const data = await res.json()
  return data.record
}