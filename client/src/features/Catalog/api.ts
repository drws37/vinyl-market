import type { Record } from "./type";

export const fetchReocrdsLoad = async (): Promise<Record[]> => {
  const res = await fetch('api/records')
  const data = await res.json()
  return data.records
}

