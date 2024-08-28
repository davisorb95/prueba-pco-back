export const getTheCatAPIHeaders = (): Headers => {
  const apiKey = process.env.CAT_API_KEY ?? ''
  const headers = new Headers()
  headers.set('x-api-key', apiKey)
  return headers
}
