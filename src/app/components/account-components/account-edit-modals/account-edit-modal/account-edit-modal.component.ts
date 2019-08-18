import { Component, OnInit } from '@angular/core';
import { AccountEditModalBase } from '../account-edit-modal-base';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseAccount } from 'src/app/models/baseAccount';

@Component({
  selector: 'app-account-edit-modal',
  templateUrl: './account-edit-modal.component.html',
  styleUrls: ['./account-edit-modal.component.scss']
})
export class AccountEditModalComponent extends AccountEditModalBase<BaseAccount> implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal) {
    super();
  }

  ngOnInit() {

    this.checkIfShouldCreateNewAccount();
  }

  public submitForm(): void {

    if (!this.performSubmitCheck())
      return;

    this.activeModal.close(this.accountOperationHelper);
  }

  protected createEmptyAccount(): void {
    this.account = <BaseAccount>{
      region: this.Regions.Eune,
    }
  }

  protected initializeAccountEditForm(): void {
    this.accountEditForm = this.formBuilder.group({
      accountId: [{ value: this.account.accountId, disabled: true }],
      login: [this.account.login, Validators.required],
      password: [this.account.password, Validators.required],
      birthDate: [this.account.birthDate ? new Date(this.account.birthDate) : null, Validators.required],
      region: [this.Regions[this.account.region], Validators.required]
    })
  }

}
