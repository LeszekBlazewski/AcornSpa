import { AccountOperation } from '../enums/account-operation.enum';
import { BaseAccount } from '../models/baseAccount';

export interface AccountOperationHelper<T extends BaseAccount> {
    AccountOperation: AccountOperation,
    Account: T
}