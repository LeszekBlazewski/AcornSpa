import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsertAuthenticationAction } from 'src/app/enums/user-authentication-action';


export abstract class AuthenticationBase {

    public form: FormGroup;

    public submitted = false;

    constructor(
        protected ngxService: NgxUiLoaderService,
        protected authenticationService: AuthenticationService,
        protected userService: UserService,
        protected notificationSerice: NotificationService,
        protected router: Router,
    ) { }

    public abstract onSubmit(): void;

    protected abstract createForm(): void;

    public get f() { return this.form.controls; }

    protected redirectLoggedInUser(): void {
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    public submitForm(operation: UsertAuthenticationAction, successMessage: string, successNavigationUrl: string) {

        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        const user: User = this.form.value;

        this.ngxService.startLoader('loader-operation');
        let operationObservable: Observable<any>;

        switch (operation) {
            case UsertAuthenticationAction.LOGIN:
                operationObservable = this.authenticationService.login(user);
                break;
            case UsertAuthenticationAction.REGISTER:
                operationObservable = this.userService.register(user);
                break;
        }

        operationObservable.subscribe(
            () => {
                this.ngxService.stopLoader('loader-operation');
                this.router.navigate([successNavigationUrl]);
                this.notificationSerice.showSuccessToastr(successMessage, '');
            },
            (error: HttpErrorResponse) => {
                this.ngxService.stopLoader('loader-operation');
                this.notificationSerice.showErrorToastr(error.toString(), '');
            });
    }
}