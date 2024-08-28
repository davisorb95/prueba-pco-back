import { ICredential } from '../interfaces/credential.interface'
import { IUser } from '../interfaces/user.interface'
import { UserModel } from './schemas/user.schema'

export const createUser = async (user: IUser): Promise<IUser> => {
  return await UserModel.create(user) as IUser
}

export const getUserByEmailAndPassword = async (credentials: ICredential): Promise<IUser> => {
  const query = { email: credentials.email, password: credentials.password }
  return await UserModel.findOne(query) as IUser
}
