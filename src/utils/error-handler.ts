import { ICustomResponse } from '../shared/interfaces/custom-response.interfaces'
import { CustomResponse } from '../shared/models/custom-response.model'

export const handlingError = (error: Error): ICustomResponse<null> => {
  const customError = new CustomResponse<null>()
  customError.error = true
  customError.message = error.message
  return customError
}
