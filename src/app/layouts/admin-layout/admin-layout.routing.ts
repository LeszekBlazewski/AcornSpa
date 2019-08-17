import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { AccountsComponent } from "../../pages/accounts/accounts.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "freshAccounts", component: AccountsComponent },
  { path: "readyAccounts", component: AccountsComponent }
];
