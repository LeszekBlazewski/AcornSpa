import { Component, OnInit } from '@angular/core';
import { BaseAccountPage } from '../base-account-page';
import { environment } from 'src/environments/environment';
import { BaseAccountService } from 'src/app/services/account-services/base-account.service';
import { BaseAccount } from 'src/app/models/baseAccount';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-fresh-accounts',
  templateUrl: './fresh-accounts.component.html',
  styleUrls: ['./fresh-accounts.component.scss']
})
export class FreshAccountsComponent extends BaseAccountPage implements OnInit {

  constructor(protected accountService: BaseAccountService<BaseAccount>,
    protected ngxService: NgxUiLoaderService,
    protected notificationService: NotificationService) {
    super(environment.freshAccountsUrl,
      "Fresh account list",
      accountService, ngxService, notificationService);
  }

  ngOnInit() {
    this.fetchAccounts();
  }

}
