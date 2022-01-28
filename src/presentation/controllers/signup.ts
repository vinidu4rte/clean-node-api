import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const { email, password, passwordConfirmation } = httpRequest.body
    if (!email) {
      return { statusCode: 400, body: new Error('Missing param: email') }
    } else if (!password) {
      return { statusCode: 400, body: new Error('Missing param: password') }
    } else if (!passwordConfirmation) {
      return { statusCode: 400, body: new Error('Missing param: password confirmation') }
    } else {
      return { statusCode: 200, body: {} }
    }
  }
}
