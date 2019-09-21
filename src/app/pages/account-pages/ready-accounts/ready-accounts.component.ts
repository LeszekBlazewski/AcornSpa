import { Component, OnInit } from '@angular/core';
import { BaseAccountPage } from '../base-account-page';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationService } from 'src/app/services/notification.service';
import { FirebaseServiceFactory } from 'src/app/providers/firebase.service.factory';

@Component({
  selector: 'app-ready-accounts',
  templateUrl: './ready-accounts.component.html',
  styleUrls: ['./ready-accounts.component.scss']
})
export class ReadyAccountsComponent extends BaseAccountPage implements OnInit {

  constructor(protected firebaseServiceFactory: FirebaseServiceFactory,
    protected ngxService: NgxUiLoaderService,
    protected notificationService: NotificationService) {
    super(environment.readyAccountsCollection,
      "Ready account list",
      firebaseServiceFactory,
      ngxService,
      notificationService
    );
  }

  ngOnInit() {
    this.fetchAccounts();
  }

}
