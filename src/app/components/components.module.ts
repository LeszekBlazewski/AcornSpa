import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BotCardComponent } from './bot-card/bot-card.component';
import { BotAccountListComponent } from './bot-account-list/bot-account-list.component';
import { ConfigModalComponent } from './config-modal/config-modal.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, NgSelectModule, FormsModule, ReactiveFormsModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, BotCardComponent, BotAccountListComponent, ConfigModalComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, BotCardComponent, ConfigModalComponent],
  entryComponents: [ConfigModalComponent]
})
export class ComponentsModule { }
