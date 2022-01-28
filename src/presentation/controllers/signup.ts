import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const { email, password, passwordConfirmation } = httpRequest.body
    if (!email) {
      return badRequest(new MissingParamError('Email'))
    } else if (!password) {
      return badRequest(new MissingParamError('Password'))
    } else if (!passwordConfirmation) {
      return badRequest(new MissingParamError('Password confirmation'))
    } else {
      return { statusCode: 200, body: {} }
    }
  }
}
