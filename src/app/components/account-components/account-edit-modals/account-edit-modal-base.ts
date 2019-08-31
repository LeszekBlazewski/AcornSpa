import { AccountOperation } from 'src/app/enums/account-operation.enum';
import { FormGroup } from '@angular/forms';
import { Region } from 'src/app/enums/region.enum';
import { Input } from '@angular/core';
import { BaseAccount } from 'src/app/models/baseAccount';
import { AccountOperationHelper } from 'src/app/helpers/account-operation.helper';

export abstract class AccountEditModalBase<T extends BaseAccount> {

  @Input() account: T

  protected accountOperationHelper: AccountOperationHelper<T>;

  public accountEditForm: FormGroup;

  protected Regions = Region;

  public regionKeys = Object.keys(Region).filter(k => typeof Region[k as any] === "number");

  protected todayDate: Date;

  public submitted: Boolean = false;

  constructor() {
    this.todayDate = new Date();
    this.accountOperationHelper = <AccountOperationHelper<T>>{};
  }

  protected abstract createEmptyAccount(): void;

  protected abstract submitForm(): void;

  protected abstract initializeAccountEditForm(): void;

  public get form() { return this.accountEditForm.controls; }

  public setTodayDate() {
    this.accountEditForm.patchValue({
      birthDate: this.todayDate
    });
  }

  protected checkIfShouldCreateNewAccount() {

    if (this.account == null) {

      this.accountOperationHelper.AccountOperation = AccountOperation.AddNewAccount;
      this.createEmptyAccount();

    } else {
      this.accountOperationHelper.AccountOperation = AccountOperation.UpdateAccount
    }
    this.initializeAccountEditForm();
  }


  protected performSubmitCheck(): boolean {

    this.submitted = true;

    if (this.accountEditForm.invalid)
      return false;

    let newAccount: T = this.accountEditForm.getRawValue();

    newAccount.region = Region[newAccount.region.toString()]; // convert ,,string" enum to numeric value

    this.accountOperationHelper.Account = newAccount;

    return true;
  }

}
