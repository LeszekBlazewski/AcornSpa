import { BaseAccount } from 'src/app/models/baseAccount';
import { BaseAccountService } from 'src/app/services/account-services/base-account.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';

export abstract class BaseAccountPage {

    public apiUrl: string;

    public accounts: BaseAccount[];

    public componentHeader: string;

    public isDataLoading: boolean;

    constructor(apiUrlForPage: string,
        componentHeader: string,
        protected accountService: BaseAccountService<BaseAccount>,
        protected ngxService: NgxUiLoaderService,
        protected notificationService: NotificationService) {
        this.apiUrl = apiUrlForPage;
        this.componentHeader = componentHeader;
    }

    protected fetchAccounts(): void {
        this.isDataLoading = true;
        this.ngxService.startLoader('loader-get-accounts');
        this.accountService.getAccounts(this.apiUrl).subscribe(fetchedAccounts => {
            this.ngxService.stopLoader('loader-get-accounts');
            setTimeout(() => {
                this.accounts = fetchedAccounts;
                this.isDataLoading = false;
            }, 1100);
        }, (error: HttpErrorResponse) => {
            this.ngxService.stopLoader('loader-get-accounts');
            setTimeout(() => this.isDataLoading = false, 1100);
            this.notificationService.showErrorToastr(error.toString(), '');
        });
    }

}
