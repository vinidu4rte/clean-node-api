import { EmailValidator } from '../presentation/protocols/email-validator'
import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('Email Validator Adapter', () => {
  const makeSut = (): EmailValidator => {
    const sut = new EmailValidatorAdapter()
    return sut
  }

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
})
