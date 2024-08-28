import { ICredential } from '../interfaces/credential.interface'

export class Credential implements ICredential {
  email!: string
  password!: string
}
