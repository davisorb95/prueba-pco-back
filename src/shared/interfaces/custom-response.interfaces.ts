export interface ICustomResponse<T> {
  error: boolean
  message: string
  data: T
}
