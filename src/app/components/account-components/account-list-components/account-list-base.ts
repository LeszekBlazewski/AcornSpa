import { BaseAccount } from 'src/app/models/baseAccount';
import { Input } from '@angular/core';
import { Region } from 'src/app/enums/region.enum';
import { IconService } from 'src/app/services/icon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountOperationHelper } from 'src/app/helpers/account-operation.helper';
import { AccountOperation } from 'src/app/enums/account-operation.enum';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';

export abstract class AccountListBase<T extends BaseAccount> {

    @Input() accounts: T[];

    @Input() componentHeader: string;

    Regions = Region;

    constructor(protected iconService: IconService,
        protected modalService: NgbModal) { }

    public abstract openSpecificAccountModal(account: T): void;

    protected abstract handleAddNewAccountAction(newAccount: T): void;

    protected abstract handleUpdateAccountAction(updatedAccount: T): void;

    protected abstract handleDeleteAccountAction(accountToDelete: T): void;

    protected removeAccountFromArray(accountId: number): void {
        const accountIndex = this.accounts.findIndex(account => account.accountId == accountId);
        this.accounts.splice(accountIndex, 1);
    }

    public getRegionIcon(accountRegion: Region): String {
        return this.iconService.getRegionIconUrl(accountRegion);
    }

    public openDeleteAccountModal(account: T) {

        const modalReference = this.modalService.open(DeleteModalComponent, { size: 'sm' });

        modalReference.componentInstance.modalHeader = "Account deletion";

        modalReference.componentInstance.modalBody = 'Are you sure you want to delete selected account ?';

        modalReference.componentInstance.modalWarning = 'This operation can not be undone.';

        modalReference.result.then(() => {

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