import express from 'express'
import { handlingError } from '../../utils/error-handler'
import { ICatImage } from '../interfaces/cat-image.interface'
import * as imagesService from '../services/images.service'
import { CustomResponse } from '../../shared/models/custom-response.model'

const router = express.Router()

router.get('/imagesbybreedid/:image_id', (req, res) => {
  void (async () => {
    try {
      const imageId = req.params.image_id
      const catImage: ICatImage = await imagesService.getCatImagesByImageId(imageId)
      const response = new CustomResponse<ICatImage[]>()
      response.data = [catImage]
      res.send(response)
    } catch (error) {
      const errorResponse = handlingError(error as Error)
      res.status(500).send(errorResponse)
    }
  })()
})

export default router
