export class ServerError extends Error {
  constructor () {
    super('Internal server error')
  }
}

// o uso do super é necessário quando extende de Error
