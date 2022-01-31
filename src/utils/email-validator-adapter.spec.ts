import { EmailValidator } from '../presentation/protocols/email-validator'
import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

// moca a lib validator, ou seja, a lib inteira é apenas as linhas abaixo
jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidator => {
  const sut = new EmailValidatorAdapter()
  return sut
}

describe('Email Validator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const result = sut.isValid('invalid_email@email.com')
    expect(result).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true)
    const result = sut.isValid('valid_email@email.com')
    expect(result).toBe(true)
  })

  test('Should call validator with the correct data', () => {
    const sut = makeSut()

    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@email.com')

    expect(isEmailSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
