import { Encrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  async encrypt (password: string): Promise<string> {
    const salt = 12
    const hash = await bcrypt.hash(password, salt)
    return hash
  }
}
