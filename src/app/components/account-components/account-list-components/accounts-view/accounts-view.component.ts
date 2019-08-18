import { Component, OnInit, Input } from '@angular/core';
import { AccountListBase } from '../account-list-base';
import { BaseAccount } from 'src/app/models/baseAccount';
import { IconService } from 'src/app/services/icon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseAccountService } from 'src/app/services/account-services/base-account.service';
import { AccountEditModalComponent } from '../../account-edit-modals/account-edit-modal/account-edit-modal.component';
import { AccountOperationHelper } from 'src/app/helpers/account-operation.helper';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.scss']
})
export class AccountsViewComponent extends AccountListBase<BaseAccount> implements OnInit {

  @Input() accountApiUrl: string;

  constructor(protected iconService: IconService,
    protected modalService: NgbModal,
    private notificationService: NotificationService,
    private baseAccountService: BaseAccountService<BaseAccount>) {
    super(iconService, modalService);
  }

  ngOnInit() {
  }

  public openSpecificAccountModal(account: BaseAccount): void {
    const modalRef = this.modalService.open(AccountEditModalComponent);

    modalRef.componentInstance.account = account;

    modalRef.result.then((accountOperationHelper: AccountOperationHelper<BaseAccount>) => {

      this.manageAccounts(accountOperationHelper);
    },
      (rejectedReason) => { }
    );
  }
  protected handleAddNewAccountAction(newAccount: BaseAccount): void {
    this.baseAccountService.addAccount(newAccount, this.accountApiUrl).subscribe((insertedAccount) => {
      this.notificationService.showSuccessToastr('Account has been successfully added !', '');
      this.accounts.push(insertedAccount);
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr("Account hasn't been saved. Is the API running ?", 'Whoop !'));
  }
  protected handleUpdateAccountAction(updatedAccount: BaseAccount): void {
    this.baseAccountService.updateAccount(updatedAccount, this.accountApiUrl).subscribe(() => {
      this.notificationService.showSuccessToastr('Account has been successfully updated !', '');
      let accountIndex = this.accounts.findIndex(account => account.accountId == updatedAccount.accountId);
      this.accounts.splice(accountIndex, 1, updatedAccount);
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr("Account hasn't been updated. Is the API running ?", 'Whoop !'));
  }
  protected handleDeleteAccountAction(accountToDelete: BaseAccount): void {
    this.baseAccountService.deleteAccount(accountToDelete.accountId, this.accountApiUrl).subscribe(() => {
      this.notificationService.showSuccessToastr('Account has been successfully deleted', '');
      let accountIndex = this.accounts.findIndex(account => account.accountId == accountToDelete.accountId);
      this.accounts.splice(accountIndex, 1);
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr('Account deletion failed. Is the API running', 'Whoop !'));
  }

}
