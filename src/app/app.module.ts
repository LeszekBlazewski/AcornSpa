import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { AccountService } from './services/account.service';
import { BaseService } from './services/base.service';
import { BotService } from './services/bot.service';
import { LogService } from './services/log.service';
import { ConfigService } from "./services/config.service";
import { NotificationService } from "./services/notification.service";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    FlexLayoutModule,
    ToastrModule.forRoot({
      maxOpened: 10,

    })
  ],
  declarations: [AppComponent, AdminLayoutComponent],
  providers: [AccountService, BaseService, BotService, LogService, ConfigService, NotificationService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
  bootstrap: [AppComponent]
})
export class AppModule { }
