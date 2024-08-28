import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
  name: String,
  age: Number,
  email: String,
  password: String
})

export const UserModel = model('users', UserSchema)
