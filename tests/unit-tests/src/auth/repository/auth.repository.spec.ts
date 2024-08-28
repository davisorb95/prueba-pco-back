import { ICredential } from '../../../../../src/auth/interfaces/credential.interface'
import { IUser } from '../../../../../src/auth/interfaces/user.interface'
import { createUser, getUserByEmailAndPassword } from '../../../../../src/auth/repository/auth.repository'
import { UserModel } from '../../../../../src/auth/repository/schemas/user.schema'

jest.mock('../../../../../src/auth/repository/schemas/user.schema', () => ({
  UserModel: {
    create: jest.fn(),
    findOne: jest.fn()
  }
}))

describe('User Service', () => {
  const mockUser: IUser = { name: 'David Soler', age: 29, email: 'david.soler@xpertgroup.co', password: '1234' }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create a user successfully', async () => {
    (UserModel.create as jest.Mock).mockResolvedValue(mockUser)

    const result = await createUser(mockUser)

    expect(result).toEqual(mockUser)
    expect(UserModel.create).toHaveBeenCalledWith(mockUser)
  })

  it('should get a user by email and password successfully', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser)
    const credentials: ICredential = { email: 'david.soler@xpertgroup.co', password: '1234' }

    const result = await getUserByEmailAndPassword(credentials)

    expect(result).toEqual(mockUser)
    expect(UserModel.findOne).toHaveBeenCalledWith({ email: credentials.email, password: credentials.password })
  })

  it('should return null if no user is found', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null)
    const credentials: ICredential = { email: 'notfound@example.com', password: 'password123' }

    const result = await getUserByEmailAndPassword(credentials)

    expect(result).toBeNull()
    expect(UserModel.findOne).toHaveBeenCalledWith({ email: credentials.email, password: credentials.password })
  })
})
