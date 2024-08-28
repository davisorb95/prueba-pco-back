import { getTheCatAPIHeaders } from '../../utils/headers'
import { IBreed } from '../interfaces/breed.interface'

export const getBreeds = async (): Promise<IBreed[]> => {
  const url = `${process.env.CAT_API_URI ?? ''}/breeds`
  const response = await fetch(url, { headers: getTheCatAPIHeaders() })
  return await response.json()
}

export const getBreedByQuery = async (query: string): Promise<IBreed[]> => {
  const url = `${process.env.CAT_API_URI ?? ''}/breeds/search?q=${query}`
  const response = await fetch(url, { headers: getTheCatAPIHeaders() })
  return await response.json()
}
