import { AccountModel } from '../../domain/models/account'
import { AddAccountModel } from '../../domain/usecases/add-account'

export class AddAccountRepo {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
