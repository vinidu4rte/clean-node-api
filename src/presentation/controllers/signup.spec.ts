import { SignUpController } from './signup'

describe('Testing SignUp Controller', () => {
  // should test users errors
  test('Must return status 400 if email isnt provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        // email isnt provided
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: Email'))
  })

  test('Must return status 400 if password isnt provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        // password isnt provided
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: Password'))
  })

  test('Must return status 400 if password confirmation isnt provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
        // passwordConfirmation isnt provided
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: Password confirmation'))
  })
})
