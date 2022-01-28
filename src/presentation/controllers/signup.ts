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
    return { statusCode: 400, body: new Error('Missing param: email') }
  }
}
