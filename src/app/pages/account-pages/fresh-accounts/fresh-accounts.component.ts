import { Component, OnInit } from '@angular/core';
import { BaseAccountPage } from '../base-account-page';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fresh-accounts',
  templateUrl: './fresh-accounts.component.html',
  styleUrls: ['./fresh-accounts.component.scss']
})
export class FreshAccountsComponent extends BaseAccountPage implements OnInit {

  constructor() {
    super(environment.freshAccountsUrl);
  }

  ngOnInit() {
  }

}
