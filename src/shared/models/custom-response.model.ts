import { ICustomResponse } from '../interfaces/custom-response.interfaces'

export class CustomResponse<T> implements ICustomResponse<T> {
  error: boolean = false
  message!: string
  data!: T
}
