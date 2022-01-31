import { EmailValidator } from '../presentation/protocols/email-validator'
import { EmailValidatorAdapter } from './email-validator'

describe('Email Validator Adapter', () => {
  const makeSut = (): EmailValidator => {
    const sut = new EmailValidatorAdapter()
    return sut
  }

  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    const result = sut.isValid('invalid_email')
    expect(result).toBe(false)
  })
})
