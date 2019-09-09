import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { BotAccountService } from './services/account-services/bot-account.service';
import { BotService } from './services/bot.service';
import { LogService } from './services/log.service';
import { BaseAccountService } from "./services/account-services/base-account.service";
import { ConfigService } from "./services/config.service";
import { NotificationService } from "./services/notification.service";
import { IconService } from "./services/icon.service";
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from "ngx-ui-loader";
import { FakeBackendAuthentication } from './fake-backend-providers/fake-backend-authentication';
import { FakeBackendBots } from './fake-backend-providers/fake-backend-bot';
import { FakeBackendLogs } from './fake-backend-providers/fake-backend-logs';
import { FakeBackendBotAccounts } from './fake-backend-providers/fake-backend-bot-accounts';
import { FakeBackendConfig } from './fake-backend-providers/fake-backend-config';
import { FakeBackendAccounts } from './fake-backend-providers/fake-backend-accounts';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#ba54f5",
  bgsOpacity: 0.7,
  bgsSize: 60,
  bgsType: "three-strings",
  blur: 6,
  delay: 0,
  fgsColor: "#ba54f5",
  fgsPosition: "center-center",
  fgsSize: 60,
  fgsType: "three-strings",
  gap: 24,
  logoPosition: "center-center",
  logoSize: 120,
  logoUrl: "",
  masterLoaderId: "master",
  overlayBorderRadius: "0",
  overlayColor: "rgba(39,41,61,.8)",
  pbColor: "#ba54f5",
  pbDirection: "ltr",
  pbThickness: 3,
  hasProgressBar: true,
  text: "",
  textPosition: "center-center",
  maxTime: -1,
  minTime: 300,
  textColor: "#B24BF3",
  bgsPosition: "top-center",
};



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    FlexLayoutModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot({
      maxOpened: 10,
    })
  ],

  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],

  providers: [
    BotAccountService,
    BotService,
    LogService,
    ConfigService,
    NotificationService,
    IconService,
    BaseAccountService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // fake backend providers register
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendAuthentication, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendBots, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendLogs, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendBotAccounts, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendConfig, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendAccounts, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
