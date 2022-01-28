import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError, InvalidParamError, ServerError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller, EmailValidator } from '../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFileds = ['email', 'password', 'passwordConfirmation']
      const { email, password, passwordConfirmation } = httpRequest.body
      for (const field of requiredFileds) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return { statusCode: 200, body: {} }
    } catch (error) {
      return serverError(new ServerError())
    }
  }
}
