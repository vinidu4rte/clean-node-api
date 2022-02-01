import { Encrypter } from '../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

describe('DbAddAccount', () => {
  class EncrypterStub implements Encrypter {
    async encrypt (password: string): Promise<string> {
      return new Promise(resolve => resolve('hash_pass'))
    }
  }

  const makeSut = (): any => {
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    return {
      sut,
      encrypterStub
    }
  }

  test('Ensure encrypter will receive password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const account = {
      email: 'valid_email@email.com',
      password: 'valid_password'
    }

    await sut.add(account)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
