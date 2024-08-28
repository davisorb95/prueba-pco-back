import { getTheCatAPIHeaders } from '../../utils/headers'
import { ICatImage } from '../interfaces/cat-image.interface'

export const getCatImagesByImageId = async (imageId: string): Promise<ICatImage> => {
  const url = `${process.env.CAT_API_URI ?? ''}/images/${imageId}`
  const response = await fetch(url, { headers: getTheCatAPIHeaders() })
  return await response.json()
}
