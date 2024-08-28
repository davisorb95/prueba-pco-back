import { ICatImage } from '../../../../../src/images/interfaces/cat-image.interface'
import { getCatImagesByImageId } from '../../../../../src/images/services/images.service'
import { getTheCatAPIHeaders } from '../../../../../src/utils/headers'

global.fetch = jest.fn()

jest.mock('../../../../../src/utils/headers', () => ({
  getTheCatAPIHeaders: jest.fn().mockReturnValue({ 'x-api-key': 'test-api-key' })
}))

describe('Cat Image Service', () => {
  const mockCatImage: ICatImage = {
    id: '0XYvRd7oD',
    url: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
    width: 1204,
    height: 1445,
    breeds: []
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch a cat image by image ID successfully', async () => {
    const imageId = '0XYvRd7oD';
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCatImage)
    })

    const result = await getCatImagesByImageId(imageId)

    expect(result).toEqual(mockCatImage)
    expect(fetch).toHaveBeenCalledWith(`${process.env.CAT_API_URI ?? ''}/images/${imageId}`, { headers: getTheCatAPIHeaders() })
  })

  it('should handle errors when fetching cat image by image ID', async () => {
    const imageId = 'invalid-image';
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(null)
    })

    const result = await getCatImagesByImageId(imageId)

    expect(result).toBeNull()
    expect(fetch).toHaveBeenCalledWith(`${process.env.CAT_API_URI ?? ''}/images/${imageId}`, { headers: getTheCatAPIHeaders() })
  })
})
