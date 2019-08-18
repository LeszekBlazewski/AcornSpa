import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { FreshAccountsComponent } from "../../pages/account-pages/fresh-accounts/fresh-accounts.component";
import { ReadyAccountsComponent } from "../../pages/account-pages/ready-accounts/ready-accounts.component";
import { ComponentsModule } from "../../components/components.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ComponentsModule,
    FlexLayoutModule,
  ],
  declarations: [
    DashboardComponent,
    FreshAccountsComponent,
    ReadyAccountsComponent
  ]
})
export class AdminLayoutModule { }
