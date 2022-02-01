import { Encrypter } from '../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

describe('DbAddAccount', () => {
  const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
      async encrypt (password: string): Promise<string> {
        return new Promise(resolve => resolve('hash_pass'))
      }
    }
    return new EncrypterStub()
  }

  const makeSut = (): any => {
    const encrypterStub = makeEncrypter()
    const sut = new DbAddAccount(encrypterStub)
    return {
      sut,
      encrypterStub
    }
  }

  test('Ensure encrypter will receive password', async () => {
    const { sut } = makeSut()
    const encryptSpy = jest.spyOn(sut.encrypter, 'encrypt')
    const account = {
      email: 'valid_email@email.com',
      password: 'valid_password'
    }

    await sut.add(account)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Ensure DbAddAccount throw error if encrypter throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut.encrypter, 'encrypt').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const account = {
      email: 'valid_email@email.com',
      password: 'valid_password'
    }

    const promise = sut.add(account)
    await expect(promise).rejects.toThrow()
  })
})
