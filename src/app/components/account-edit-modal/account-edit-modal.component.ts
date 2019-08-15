import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/account';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Region } from 'src/app/enums/region.enum';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountOperation } from 'src/app/enums/account-operation.enum';
import { AccountOperationHelper } from 'src/app/helpers/account-operation.helper';

@Component({
  selector: 'app-account-edit-modal',
  templateUrl: './account-edit-modal.component.html',
  styleUrls: ['./account-edit-modal.component.scss']
})
export class AccountEditModalComponent implements OnInit {

  opeartionToPerform: AccountOperation;

  @Input() account: Account

  @Input() referencedBotId: number;

  accountEditForm: FormGroup;

  Regions = Region;

  regionKeys = Object.keys(Region).filter(k => typeof Region[k as any] === "number");

  todayDate: Date;

  submitted: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

    this.account != null ? this.opeartionToPerform = AccountOperation.UpdateAccount : this.opeartionToPerform = AccountOperation.AddNewAccount;

    this.todayDate = new Date();

    if (this.opeartionToPerform == AccountOperation.AddNewAccount) {
      this.createEmptyAccount();
    }

    this.initializeAccountEditForm();
  }

  private initializeAccountEditForm() {
    this.accountEditForm = this.formBuilder.group({
      accountId: [{ value: this.account.accountId, disabled: true }],
      botId: [{ value: this.account.botId, disabled: this.opeartionToPerform == AccountOperation.AddNewAccount ? true : false }],
      login: [this.account.login, Validators.required],
      password: [this.account.password, Validators.required],
      birthDate: [this.account.birthDate ? new Date(this.account.birthDate) : null, Validators.required],
      region: [this.Regions[this.account.region], Validators.required],
      level: [{ value: this.account.level, disabled: true }],
      expPercentage: [{ value: this.account.expPercentage, disabled: true }]
    })
  }

  get form() { return this.accountEditForm.controls; }

  submitForm() {

    this.submitted = true;

    if (this.accountEditForm.invalid)
      return;

    let accountOperationHelper = <AccountOperationHelper>{};

    let newAccount: Account = this.accountEditForm.getRawValue();

    newAccount.region = Region[newAccount.region.toString()]; // convert ,,string" enum to numeric value

    if (this.referencedBotId != newAccount.botId)             // check if user requested assign of the account to different bot
      this.opeartionToPerform = AccountOperation.AssignToDifferentBotAccount;

    accountOperationHelper.Account = newAccount;

    accountOperationHelper.AccountOperation = this.opeartionToPerform;

    this.activeModal.close(accountOperationHelper);
  }

  private createEmptyAccount() {
    this.account = <Account>{
      botId: this.referencedBotId,
      region: this.Regions.Eune,
      level: 1,
      expPercentage: 0,
    }
  }

  setTodayDate() {
    this.accountEditForm.patchValue({
      birthDate: this.todayDate
    });
  }
}