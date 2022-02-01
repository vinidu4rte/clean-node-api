import { AccountModel } from '../../domain/models/account'
import { Encrypter } from '../protocols/encrypter'
import { DbAddAccount } from './db-add-account'
import { AddAccountModel } from '../../domain/usecases/add-account'
import { AddAccountRepo } from '../protocols/add-account-repo'

describe('DbAddAccount', () => {
  const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
      async encrypt (password: string): Promise<string> {
        return new Promise(resolve => resolve('hash_pass'))
      }
    }
    return new EncrypterStub()
  }

  const makeAddAccountRepo = (): AddAccountRepo => {
    class AddAccountRepo implements AddAccountRepo {
      async add (account: AddAccountModel): Promise<AccountModel> {
        return new Promise(resolve => resolve({
          id: 'valid_id',
          email: 'valid_email',
          password: 'hash_pass'
        }))
      }
    }
    return new AddAccountRepo()
  }

  interface SutTypes {
    sut: DbAddAccount
    encrypterStub: Encrypter
    addAccountRepoStub: AddAccountRepo
  }

  const makeSut = (): SutTypes => {
    const encrypterStub = makeEncrypter()
    const addAccountRepoStub = makeAddAccountRepo()
    const sut = new DbAddAccount(encrypterStub, addAccountRepoStub)
    return {
      sut,
      encrypterStub,
      addAccountRepoStub
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

  test('Ensure DbAddAccount throw error if encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const account = {
      email: 'valid_email@email.com',
      password: 'valid_password'
    }

    const promise = sut.add(account)
    await expect(promise).rejects.toThrow()
  })

  test('Ensure AddAccountRepo will receive correct values', async () => {
    const { sut, addAccountRepoStub } = makeSut()
    const addAccountRepoSpy = jest.spyOn(addAccountRepoStub, 'add')

    const account = {
      email: 'valid_email@email.com',
      password: 'valid_password'
    }

    await sut.add(account)
    expect(addAccountRepoSpy).toHaveBeenCalledWith({
      email: 'valid_email@email.com',
      password: 'hash_pass'
    })
  })
})
