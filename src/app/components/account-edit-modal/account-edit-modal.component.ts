import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Region } from 'src/app/enums/region.enum';
import { NgbCalendar, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  today = this.calendar.getToday();

  constructor(private accountService: AccountService,
    private formBuilder: FormBuilder,
    private calendar: NgbCalendar,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

    this.account != null ? this.isNewAccount = false : this.isNewAccount = true;

    if (this.isNewAccount) {
      this.account = <Account>{};
      this.account.botId = this.referencedBotId;
    }

    this.initializeAccountEditForm();
  }

  private initializeAccountEditForm() {
    this.accountEditForm = this.formBuilder.group({
      accountId: [{ value: this.account.accountId, disabled: true }],
      botId: [this.account.botId, Validators.required],
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

    if (this.accountEditForm.invalid)
      return;

    this.account = this.accountEditForm.getRawValue();


    // TODO ADD PROPER NOTIFICATIONS FOR SUCCESS/ERROR request !
    if (this.isNewAccount)
      this.accountService.addAccount(this.account);
    else
      this.accountService.updateAccount(this.account);

    this.activeModal.close();
  }
}
