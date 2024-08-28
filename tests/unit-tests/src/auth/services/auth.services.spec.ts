import * as authService from '../../../../../src/auth/services/auth.service'
import * as authRepository from '../../../../../src/auth/repository/auth.repository'
import { IUser } from '../../../../../src/auth/interfaces/user.interface'
import { ICredential } from '../../../../../src/auth/interfaces/credential.interface'

jest.mock('../../../../../src/auth/repository/auth.repository')

describe('Auth service', () => {
  const mockUser: IUser = { name: 'David Soler', age: 29, email: 'david.soler@xpertgroup.co', password: '1234' }
  const credentials: ICredential = { email: 'david.soler@xpertgroup.co', password: '1234' }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should register a user successfully', async () => {
    (authRepository.createUser as jest.Mock).mockResolvedValue(mockUser)

    const result = await authService.register(mockUser)

    expect(result).toEqual(mockUser)
    expect(authRepository.createUser).toHaveBeenCalledWith(mockUser)
  })

  it('should throw an error if user registration fails', async () => {
    (authRepository.createUser as jest.Mock).mockResolvedValue(null)

    await expect(authService.register(mockUser)).rejects.toThrow('No se pudo registrar el usuario.')
  })

  it('should login a user successfully', async () => {
    (authRepository.getUserByEmailAndPassword as jest.Mock).mockResolvedValue(mockUser)
    const result = await authService.login(credentials)
    expect(result.name).toStrictEqual('David Soler')
  })

  it('should throw an error if login fails', async () => {
    (authRepository.getUserByEmailAndPassword as jest.Mock).mockResolvedValue(null)
    await expect(authService.login(credentials)).rejects.toThrow('No se encontró un usuario que coincida con el correo y la contraseña.')
  })
})
