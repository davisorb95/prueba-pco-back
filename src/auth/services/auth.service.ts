import { ICredential } from '../interfaces/credential.interface'
import { IUser } from '../interfaces/user.interface'
import * as authRepository from '../repository/auth.repository'

export const register = async (user: IUser): Promise<IUser> => {
  const newUser = await authRepository.createUser(user)
  if (newUser == null) {
    throw Error('No se pudo registrar el usuario.')
  }
  return user
}

export const login = async (credentials: ICredential): Promise<IUser> => {
  const user = await authRepository.getUserByEmailAndPassword(credentials)
  if (user == null) {
    throw Error('No se encontró un usuario que coincida con el correo y la contraseña.')
  }
  return user
}
