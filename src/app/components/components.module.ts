import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BotCardComponent } from './bot-card/bot-card.component';
import { BotAccountListComponent } from './bot-account-list/bot-account-list.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, NgSelectModule, FormsModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, BotCardComponent, BotAccountListComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, BotCardComponent],
})
export class ComponentsModule { }
