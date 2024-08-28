import express from 'express'
import * as authService from '../services/auth.service'
import { handlingError } from '../../utils/error-handler'
import { Credential } from '../models/credential.model'
import { IUser } from '../interfaces/user.interface'
import { User } from '../models/user.model'
import { ICredential } from '../interfaces/credential.interface'
import { CustomResponse } from '../../shared/models/custom-response.model'

const router = express.Router()

router.post('/register', (req, res) => {
  void (async () => {
    try {
      const { name, age, email, password } = req.body
      const user: IUser = new User()
      user.name = name
      user.age = age
      user.email = email
      user.password = password
      const registerResponse = await authService.register(user)
      const response = new CustomResponse<IUser>()
      response.data = registerResponse
      res.send(response)
    } catch (error) {
      const errorResponse = handlingError(error as Error)
      res.status(500).send(errorResponse)
    }
  })()
})
router.post('/login', (req, res) => {
  void (async () => {
    try {
      const { email, password } = req.body
      const credentials: ICredential = new Credential()
      credentials.email = email
      credentials.password = password
      const loginResponse = await authService.login(credentials)
      const response = new CustomResponse<IUser>()
      response.data = loginResponse
      res.send(response)
    } catch (error) {
      const errorResponse = handlingError(error as Error)
      res.status(500).send(errorResponse)
    }
  })()
})

export default router
