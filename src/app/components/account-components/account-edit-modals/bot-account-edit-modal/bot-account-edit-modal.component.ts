import { Component, OnInit, Input } from '@angular/core';
import { BotAccount } from 'src/app/models/account';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountOperation } from 'src/app/enums/account-operation.enum';
import { AccountEditModalBase } from '../account-edit-modal-base';

@Component({
  selector: 'app-bot-account-edit-modal',
  templateUrl: './bot-account-edit-modal.component.html',
  styleUrls: ['./bot-account-edit-modal.component.scss']
})
export class BotAccountEditModalComponent extends AccountEditModalBase<BotAccount> implements OnInit {

  @Input() referencedBotId: number;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal) {
    super();
  }

  ngOnInit() {

    this.checkIfShouldCreateNewAccount();

  }

  submitForm() {

    if (!this.performSubmitCheck())
      return;

    if (this.referencedBotId != this.accountOperationHelper.Account.botId)             // check if user requested assign of the account to different bot
      this.accountOperationHelper.AccountOperation = AccountOperation.AssignToDifferentBotAccount;

    this.activeModal.close(this.accountOperationHelper);
  }

  createEmptyAccount() {
    this.account = <BotAccount>{
      botId: this.referencedBotId,
      region: this.Regions.Eune,
      level: 1,
      expPercentage: 0,
    }
  }

  initializeAccountEditForm() {
    this.accountEditForm = this.formBuilder.group({
      accountId: [{ value: this.account.accountId, disabled: true }],
      botId: [{ value: this.account.botId, disabled: this.accountOperationHelper.AccountOperation == AccountOperation.AddNewAccount ? true : false }],
      login: [this.account.login, Validators.required],
      password: [this.account.password, Validators.required],
      birthDate: [this.account.birthDate ? new Date(this.account.birthDate) : null, Validators.required],
      region: [this.Regions[this.account.region], Validators.required],
      level: [{ value: this.account.level, disabled: true }],
      expPercentage: [{ value: this.account.expPercentage, disabled: true }]
    })
  }
}