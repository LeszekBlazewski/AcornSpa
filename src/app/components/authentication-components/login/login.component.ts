import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UsertAuthenticationAction } from 'src/app/enums/user-authentication-action';
import { AuthenticationBase } from '../authentication-base';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AuthenticationBase implements OnInit {

  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    protected ngxService: NgxUiLoaderService,
    protected authenticationService: AuthenticationService,
    protected userService: UserService,
    protected notificationSerice: NotificationService,
    protected router: Router,
  ) {
    super(ngxService, authenticationService, userService, notificationSerice, router);
    // redirect to home if already logged in
    this.redirectLoggedInUser();
  }

  ngOnInit() {
    this.createForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {

    this.submitForm(UsertAuthenticationAction.LOGIN, 'Logged in successful', this.returnUrl);
  }

  protected createForm(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
