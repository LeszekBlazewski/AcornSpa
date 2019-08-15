import { AccountOperation } from '../enums/account-operation.enum';
import { Account } from '../models/account';

export interface AccountOperationHelper {
    AccountOperation: AccountOperation,
    Account: Account
}