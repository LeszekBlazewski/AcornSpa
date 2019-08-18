import { Component, OnInit } from '@angular/core';
import { BaseAccountPage } from '../base-account-page';
import { environment } from 'src/environments/environment';
import { BaseAccountService } from 'src/app/services/account-services/base-account.service';
import { BaseAccount } from 'src/app/models/baseAccount';

@Component({
  selector: 'app-ready-accounts',
  templateUrl: './ready-accounts.component.html',
  styleUrls: ['./ready-accounts.component.scss']
})
export class ReadyAccountsComponent extends BaseAccountPage implements OnInit {

  constructor(protected accountService: BaseAccountService<BaseAccount>) {
    super(environment.readyAccountsUrl,
      "Ready account list",
      accountService);
  }

  ngOnInit() {
    this.fetchAccounts();
  }

}
