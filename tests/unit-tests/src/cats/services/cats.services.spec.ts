import { IBreed } from '../../../../../src/cats/interfaces/breed.interface'
import { getBreeds, getBreedByQuery } from '../../../../../src/cats/services/cats.service'
import { getTheCatAPIHeaders } from '../../../../../src/utils/headers'

global.fetch = jest.fn()

jest.mock('../../../../../src/utils/headers', () => ({
  getTheCatAPIHeaders: jest.fn().mockReturnValue({ 'x-api-key': 'test-api-key' })
}))

describe('Breed Service', () => {
  const mockBreeds: IBreed[] = [
    {
      weight: {
        imperial: '7  -  10',
        metric: '3 - 5'
      },
      id: 'abys',
      name: 'Abyssinian',
      cfa_url: 'http://cfa.org/Breeds/BreedsAB/Abyssinian.aspx',
      vetstreet_url: 'http://www.vetstreet.com/cats/abyssinian',
      vcahospitals_url: 'https://vcahospitals.com/know-your-pet/cat-breeds/abyssinian',
      temperament: 'Active, Energetic, Independent, Intelligent, Gentle',
      origin: 'Egypt',
      country_codes: 'EG',
      country_code: 'EG',
      description: "The Abyssinian is easy to care for, and a joy to have in your home. They're affectionate cats and love both people and other animals.",
      life_span: '14 - 15',
      indoor: 0,
      lap: 1,
      alt_names: '',
      adaptability: 5,
      affection_level: 5,
      child_friendly: 3,
      dog_friendly: 4,
      energy_level: 5,
      grooming: 1,
      health_issues: 2,
      intelligence: 5,
      shedding_level: 2,
      social_needs: 5,
      stranger_friendly: 5,
      vocalisation: 1,
      experimental: 0,
      hairless: 0,
      natural: 1,
      rare: 0,
      rex: 0,
      suppressed_tail: 0,
      short_legs: 0,
      wikipedia_url: 'https://en.wikipedia.org/wiki/Abyssinian_(cat)',
      hypoallergenic: 0,
      reference_image_id: '0XYvRd7oD'
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch all breeds successfully', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockBreeds)
    })

    const result = await getBreeds()

    expect(result).toEqual(mockBreeds)
    expect(fetch).toHaveBeenCalledWith(`${process.env.CAT_API_URI ?? ''}/breeds`, { headers: getTheCatAPIHeaders() })
  })

  it('should fetch breeds by query successfully', async () => {
    const query = 'Breed1';
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue([mockBreeds[0]])
    })

    const result = await getBreedByQuery(query)

    expect(result).toEqual([mockBreeds[0]])
    expect(fetch).toHaveBeenCalledWith(`${process.env.CAT_API_URI ?? ''}/breeds/search?q=${query}`, { headers: getTheCatAPIHeaders() })
  })

  it('should handle empty query in getBreedByQuery', async () => {
    const query = '';
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockBreeds)
    })

    const result = await getBreedByQuery(query)

    expect(result).toEqual(mockBreeds)
    expect(fetch).toHaveBeenCalledWith(`${process.env.CAT_API_URI ?? ''}/breeds/search?q=${query}`, { headers: getTheCatAPIHeaders() })
  })
})
