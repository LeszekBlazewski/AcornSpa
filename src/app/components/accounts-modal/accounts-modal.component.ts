import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountEditModalComponent } from "../account-edit-modal/account-edit-modal.component";
import { Account } from 'src/app/models/account';
import { Region } from 'src/app/enums/region.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { IconService } from "src/app/services/icon.service";
import { AccountOperation } from 'src/app/enums/account-operation.enum';
import { AccountOperationHelper } from 'src/app/helpers/account-operation.helper';

@Component({
  selector: 'app-accounts-modal',
  templateUrl: './accounts-modal.component.html',
  styleUrls: ['./accounts-modal.component.scss']
})
export class AccountsModalComponent implements OnInit {

  constructor(private accountService: AccountService,
    private notificationService: NotificationService,
    private iconService: IconService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
  ) { }

  @Input() accounts: Account[];

  @Input() referencedBotId: number;

  Regions = Region;

  ngOnInit() {

  }

  public getRegionIcon(accountRegion: Region): String {
    return this.iconService.getRegionIconUrl(accountRegion);
  }

  openSpecificAccountModal(account: Account) {
    const modalRef = this.modalService.open(AccountEditModalComponent);

    modalRef.componentInstance.account = account;

    modalRef.componentInstance.referencedBotId = this.referencedBotId;

    modalRef.result.then((accountOperationHelper: AccountOperationHelper) =>
      this.manageAccounts(accountOperationHelper),
      (rejectedReason) => { }
    );
  }

  openDeleteAccountModal(template: any, account: Account) {
    this.modalService.open(template, { size: 'sm' }).result.then(() => {

      const accountOperationHelper = <AccountOperationHelper>{
        AccountOperation: AccountOperation.DeleteAccount,
        Account: account
      };
      this.manageAccounts(accountOperationHelper)
    }, (rejectedReason) => { }
    );
  }

  private manageAccounts(accountOperationHelper: AccountOperationHelper) {

    const accountWithUpdatedData = accountOperationHelper.Account;

    switch (accountOperationHelper.AccountOperation) {
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

  private handleAddNewAccountAction(newAccount: Account) {
    this.accountService.addAccount(newAccount).subscribe((insertedAccount) => {
      this.notificationService.showSuccessToastr('Account has been successfully added !', '');
      this.accounts.push(insertedAccount);
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr("Account hasn't been saved. Is the API running ?", 'Whoop !'));
  }

  private handleUpdateAccountAction(updatedAccount: Account) {
    this.accountService.updateAccount(updatedAccount).subscribe(() => {
      this.notificationService.showSuccessToastr('Account has been successfully updated !', '');
      let accountIndex = this.accounts.findIndex(account => account.accountId == updatedAccount.accountId);
      this.accounts.splice(accountIndex, 1, updatedAccount);
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr("Account hasn't been updated. Is the API running ?", 'Whoop !'));
  }

  private handleDeleteAccountAction(accountToDelete: Account) {
    this.accountService.deleteAccount(accountToDelete.accountId).subscribe(() => {
      this.notificationService.showSuccessToastr('Account has been successfully deleted', '');
      this.accounts.splice(this.accounts.indexOf(accountToDelete), 1);
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr('Account deletion failed. Is the API running', 'Whoop !'));
  }
}
