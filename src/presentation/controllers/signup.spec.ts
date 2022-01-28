import { SignUpController } from './signup'
import { MissingParamError, InvalidParamError, ServerError } from '../errors/'
import { EmailValidator } from '../protocols'

const makeEmailValidatorSut = (): EmailValidator => {
  class EmailValidatorStub {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): any => {
  const emailValidatorStub = makeEmailValidatorSut()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Testing SignUp Controller', () => {
  // should test users errors
  test('Must return status 400 if email isnt provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        // email isnt provided
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Must return status 400 if password isnt provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        // password isnt provided
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Must return status 400 if password confirmation isnt provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
        // passwordConfirmation isnt provided
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Must return status 400 if password confirmation fails', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('Must return status 400 if email provided is invalid', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Ensure isValid function will validated the correct data', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValid = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        email: 'email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    sut.handle(httpRequest)
    expect(isValid).toHaveBeenCalledWith('email@email.com')
  })

  test('Must return status 500 if email throws a Error', () => {
    const { sut, emailValidatorStub } = makeSut()
    const httpRequest = {
      body: {
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new ServerError()
    })

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
