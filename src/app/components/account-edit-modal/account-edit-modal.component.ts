import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Region } from 'src/app/enums/region.enum';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account-edit-modal',
  templateUrl: './account-edit-modal.component.html',
  styleUrls: ['./account-edit-modal.component.scss']
})
export class AccountEditModalComponent implements OnInit {

  isNewAccount: boolean;

  @Input() account: Account

  @Input() referencedBotId: number;

  accountEditForm: FormGroup;

  Regions = Region;

  regionKeys = Object.keys(Region).filter(k => typeof Region[k as any] === "number");

  todayDate: Date;

  submitted: Boolean = false;

  constructor(private accountService: AccountService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private notificationService: NotificationService) { }

  ngOnInit() {

    this.account != null ? this.isNewAccount = false : this.isNewAccount = true;

    this.todayDate = new Date();

    if (this.isNewAccount) {
      this.createEmptyAccount();
    }

    this.initializeAccountEditForm();
  }

  private initializeAccountEditForm() {
    this.accountEditForm = this.formBuilder.group({
      accountId: [{ value: this.account.accountId, disabled: true }],
      botId: [{ value: this.account.botId, disabled: this.isNewAccount ? true : false }],
      login: [this.account.login, Validators.required],
      password: [this.account.password, Validators.required],
      birthDate: [this.account.birthDate, Validators.required],
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

    this.account = this.accountEditForm.getRawValue();

    // TODO ADD PROPER NOTIFICATIONS FOR SUCCESS/ERROR request !
    if (this.isNewAccount) {
      this.accountService.addAccount(this.account).subscribe(() =>
        this.notificationService.showSuccessToastr('Account has been successfully added !', ''),
        (error: HttpErrorResponse) =>
          this.notificationService.showErrorToastr("Account hasn't been saved. Is the API running ?", 'Whoop !'));
    }
    else {
      this.accountService.updateAccount(this.account).subscribe(() =>
        this.notificationService.showSuccessToastr('Account has been successfully updated !', ''),
        (error: HttpErrorResponse) =>
          this.notificationService.showErrorToastr("Account hasn't been updated. Is the API running ?", 'Whoop !'));
    }
    this.activeModal.close();
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