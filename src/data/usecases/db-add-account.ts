import { AddAccount, AddAccountModel } from '../../domain/usecases/add-account'
import { AccountModel } from '../../domain/models/account'
import { Encrypter } from '../protocols/encrypter'
import { AddAccountRepo } from '../protocols/add-account-repo'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepo: AddAccountRepo

  constructor (encrypter: Encrypter, addAccountRepo: AddAccountRepo) {
    this.encrypter = encrypter
    this.addAccountRepo = addAccountRepo
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)

    // não mexer no objeto que chega
    // account.password = hashedPassword

    // utilizar o assign faz uma copia do objeto e podemos modificar um valor que existe nele sobreescrevendo-o.
    const accountModel = await this.addAccountRepo.add(Object.assign({}, account, { password: hashedPassword }))

    return new Promise(resolve => resolve(accountModel))
  }
}
