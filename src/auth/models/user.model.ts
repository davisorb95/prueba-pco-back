import { IUser } from '../interfaces/user.interface'

export class User implements IUser {
  name!: string
  age!: number
  email!: string
  password!: string
}
