import { Component, OnInit } from '@angular/core';
import { BaseAccountPage } from '../base-account-page';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationService } from 'src/app/services/notification.service';
import { FirebaseServiceFactory } from 'src/app/providers/firebase.service.factory';

@Component({
  selector: 'app-fresh-accounts',
  templateUrl: './fresh-accounts.component.html',
  styleUrls: ['./fresh-accounts.component.scss']
})
export class FreshAccountsComponent extends BaseAccountPage implements OnInit {

  constructor(protected firebaseServiceFactory: FirebaseServiceFactory,
    protected ngxService: NgxUiLoaderService,
    protected notificationService: NotificationService) {
    super(environment.freshAccountsCollection,
      "Fresh account list",
      firebaseServiceFactory, ngxService, notificationService);
  }

  ngOnInit() {
    this.fetchAccounts();
  }

}
