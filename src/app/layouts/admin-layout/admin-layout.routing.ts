import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { FreshAccountsComponent } from "../../pages/account-pages/fresh-accounts/fresh-accounts.component";
import { ReadyAccountsComponent } from "../../pages/account-pages/ready-accounts/ready-accounts.component";
import { environment } from 'src/environments/environment';

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "freshAccounts", component: FreshAccountsComponent, data: { accountApiUrl: environment.freshAccountsUrl } },
  { path: "readyAccounts", component: ReadyAccountsComponent, data: { accountApiUrl: environment.readyAccountsUrl } }
];
