import { BaseAccount } from 'src/app/models/baseAccount';
import { Input } from '@angular/core';
import { Region } from 'src/app/enums/region.enum';
import { IconService } from 'src/app/services/icon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountOperationHelper } from 'src/app/helpers/account-operation.helper';
import { AccountOperation } from 'src/app/enums/account-operation.enum';

export abstract class AccountListBase<T extends BaseAccount> {

    @Input() accounts: T[];

    @Input() componentHeader: string;

    Regions = Region;

    protected abstract openSpecificAccountModal(account: T): void;

    protected abstract handleAddNewAccountAction(newAccount: T): void;

    protected abstract handleUpdateAccountAction(updatedAccount: T): void;

    protected abstract handleDeleteAccountAction(accountToDelete: T): void;

    public getRegionIcon(accountRegion: Region): String {
        return this.iconService.getRegionIconUrl(accountRegion);
    }

    constructor(protected iconService: IconService,
        protected modalService: NgbModal) { }

    public openDeleteAccountModal(template: any, account: T) {
        this.modalService.open(template, { size: 'sm' }).result.then(() => {

            const accountOperationHelper = <AccountOperationHelper<T>>{
                AccountOperation: AccountOperation.DeleteAccount,
                Account: account
            };
            this.manageAccounts(accountOperationHelper)
        }, (rejectedReason) => { }
        );
    }

    protected manageAccounts(accountOperationHelper: AccountOperationHelper<T>) {

        const actionToPerfom = accountOperationHelper.AccountOperation;

        const accountWithUpdatedData = accountOperationHelper.Account;

        switch (actionToPerfom) {
            case AccountOperation.AddNewAccount:
                this.handleAddNewAccountAction(accountWithUpdatedData);
                break;
            case AccountOperation.UpdateAccount:
                this.handleUpdateAccountAction(accountWithUpdatedData);
                break;
            case AccountOperation.DeleteAccount:
                this.handleDeleteAccountAction(accountWithUpdatedData);
                break;
        }
    }
}