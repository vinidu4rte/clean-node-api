// interface httpRequest {
//   body: {
//     email: string
//     password: string
//     passwordConfirmation: string
//   }
// }

// interface httpResponse {
//   statusCode: number
//   message: string
// }

export class SignUpController {
  handle (httpRequest: any): any {
    const { email, password, passwordConfirmation } = httpRequest.body
    if (!email) {
      return { statusCode: 400, body: new Error('Missing param: email') }
    } else if (!password) {
      return { statusCode: 400, body: new Error('Missing param: password') }
    } else if (!passwordConfirmation) {
      return { statusCode: 400, body: new Error('Missing param: password confirmation') }
    }
  }
}
