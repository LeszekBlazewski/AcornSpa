import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationBase } from "../authentication-base";
import { UsertAuthenticationAction } from 'src/app/enums/user-authentication-action';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends AuthenticationBase implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
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
  }

  onSubmit() {
    this.submitForm(UsertAuthenticationAction.REGISTER, 'Registration successful', '/login');
  }

  protected createForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

}
