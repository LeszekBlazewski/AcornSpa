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

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FirebaseServiceFactory } from './providers/firebase.service.factory';

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
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
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
    FirebaseServiceFactory,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
