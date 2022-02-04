import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hashed_pass'))
  }
}))

describe('Bcrypt Adapter', () => {
  // necessário para o uso  do bcrypt
  const salt = 12

  const makeSut = (): BcryptAdapter => {
    const sut = new BcryptAdapter()
    return sut
  }

  test('Should use the correct data', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('password')
    expect(hashSpy).toBeCalledWith('password', salt)
  })

  test('Should return hash if success', async () => {
    const sut = makeSut()

    const hash = await sut.encrypt('password')
    expect(hash).toEqual('hashed_pass')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.encrypt('password')

    await expect(promise).rejects.toThrow()
  })
})
