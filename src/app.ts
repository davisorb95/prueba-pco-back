import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './auth/routes/auth.routes'
import catsRoutes from './cats/routes/cats.routes'
import imagesRoutes from './images/routes/images.routes'
import * as db from './utils/db'
import cors from 'cors'

dotenv.config()
void db.connect()

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/cats', catsRoutes)
app.use('/api/v1/images', imagesRoutes)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
