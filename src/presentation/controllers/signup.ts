import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const { email, password, passwordConfirmation } = httpRequest.body
    if (!email) {
      return { statusCode: 400, body: new MissingParamError('Email') }
    } else if (!password) {
      return { statusCode: 400, body: new MissingParamError('Password') }
    } else if (!passwordConfirmation) {
      return { statusCode: 400, body: new MissingParamError('Password confirmation') }
    } else {
      return { statusCode: 200, body: {} }
    }
  }
}
