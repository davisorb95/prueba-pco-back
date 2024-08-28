import express from 'express'
import { handlingError } from '../../utils/error-handler'
import { IBreed } from '../interfaces/breed.interface'
import * as catsService from '../services/cats.service'
import { CustomResponse } from '../../shared/models/custom-response.model'
import { Breed } from '../models/breed.model'

const router = express.Router()

router.get('/breeds', (_req, res) => {
  void (async () => {
    try {
      const breeds: IBreed[] = await catsService.getBreeds()
      const response = new CustomResponse<IBreed[]>()
      response.data = breeds
      res.send(response)
    } catch (error) {
      const errorResponse = handlingError(error as Error)
      res.status(500).send(errorResponse)
    }
  })()
})

router.get('/breeds/:breed_id', (req, res) => {
  void (async () => {
    try {
      const breedId = req.params.breed_id
      const breeds: IBreed[] = await catsService.getBreedByQuery(breedId)
      const breed = breeds.pop()
      const response = new CustomResponse<IBreed>()
      response.data = breed ?? new Breed()
      res.send(response)
    } catch (error) {
      const errorResponse = handlingError(error as Error)
      res.status(500).send(errorResponse)
    }
  })()
})

router.get('/breeds/search/:text', (req, res) => {
  void (async () => {
    try {
      const text = req.params.text
      const breeds: IBreed[] = await catsService.getBreedByQuery(text)
      const response = new CustomResponse<IBreed[]>()
      response.data = breeds
      res.send(breeds)
    } catch (error) {
      const errorResponse = handlingError(error as Error)
      res.status(500).send(errorResponse)
    }
  })()
})

export default router
