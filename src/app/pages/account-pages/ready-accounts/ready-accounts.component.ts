import { Component, OnInit } from '@angular/core';
import { BaseAccountPage } from '../base-account-page';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ready-accounts',
  templateUrl: './ready-accounts.component.html',
  styleUrls: ['./ready-accounts.component.scss']
})
export class ReadyAccountsComponent extends BaseAccountPage implements OnInit {

  constructor() {
    super(environment.readyAccountsUrl);
  }

  ngOnInit() {
  }

}
