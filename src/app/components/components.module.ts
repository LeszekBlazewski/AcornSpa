import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BotCardComponent } from './bot-components/bot-card/bot-card.component';
import { BotAccountListComponent } from './bot-components/bot-account-list/bot-account-list.component';
import { ConfigModalComponent } from './config-modal/config-modal.component';
import { ToastrNotificationComponent } from './toastr-notification/toastr-notification.component';
import { BotAccountsModalComponent } from './account-components/account-list-components/bot-accounts-modal/bot-accounts-modal.component';
import { BotAccountEditModalComponent } from './account-components/account-edit-modals/bot-account-edit-modal/bot-account-edit-modal.component';
import { AccountEditModalComponent } from './account-components/account-edit-modals/account-edit-modal/account-edit-modal.component';
import { AccountsViewComponent } from './account-components/account-list-components/accounts-view/accounts-view.component';
import { BotAddModalComponent } from './bot-components/bot-add-modal/bot-add-modal.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, NgSelectModule, FormsModule, ReactiveFormsModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, BotCardComponent, BotAccountListComponent, ConfigModalComponent, ToastrNotificationComponent, BotAccountEditModalComponent, AccountEditModalComponent, BotAccountsModalComponent, AccountsViewComponent, BotAddModalComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, BotCardComponent, ConfigModalComponent, ToastrNotificationComponent, AccountsViewComponent],
  entryComponents: [ConfigModalComponent, ToastrNotificationComponent, BotAccountsModalComponent, BotAccountEditModalComponent, AccountEditModalComponent, BotAddModalComponent]
})
export class ComponentsModule { }