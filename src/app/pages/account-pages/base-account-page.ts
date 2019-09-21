import { BaseAccount } from 'src/app/models/baseAccount';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FirebaseServiceFactory } from 'src/app/providers/firebase.service.factory';

export abstract class BaseAccountPage {

    public documentLibraryPath: string;

    public accounts: BaseAccount[];

    public componentHeader: string;

    public isDataLoading: boolean;

    private accountService: FirebaseService<BaseAccount>;

    constructor(documentLibraryPath: string,
        componentHeader: string,
        protected firebaseServiceFactory: FirebaseServiceFactory,
        protected ngxService: NgxUiLoaderService,
        protected notificationService: NotificationService) {
        this.documentLibraryPath = documentLibraryPath;
        this.componentHeader = componentHeader;
        this.accountService = this.firebaseServiceFactory.createSpecificFirebaseService<BaseAccount>(documentLibraryPath);
    }

    protected fetchAccounts(): void {
        this.isDataLoading = true;
        this.ngxService.startLoader('loader-get-accounts');
        this.accountService.getAllFromCollection().subscribe(fetchedAccounts => {
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
