import { Component, OnInit, Input } from '@angular/core';
import { BotAccountService } from 'src/app/services/bot-account.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BotAccountEditModalComponent } from "../account-edit-modals/bot-account-edit-modal/bot-account-edit-modal.component";
import { BotAccount } from 'src/app/models/account';
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

  constructor(private accountService: BotAccountService,
    private notificationService: NotificationService,
    private iconService: IconService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
  ) { }

  @Input() accounts: BotAccount[];

  @Input() referencedBotId: number;

  Regions = Region;

  ngOnInit() {

  }

  public getRegionIcon(accountRegion: Region): String {
    return this.iconService.getRegionIconUrl(accountRegion);
  }

  openSpecificAccountModal(account: BotAccount) {
    const modalRef = this.modalService.open(BotAccountEditModalComponent);

    modalRef.componentInstance.account = account;

    modalRef.componentInstance.referencedBotId = this.referencedBotId;

    modalRef.result.then((accountOperationHelper: AccountOperationHelper<BotAccount>) =>
      this.manageAccounts(accountOperationHelper),
      (rejectedReason) => { }
    );
  }

  openDeleteAccountModal(template: any, account: BotAccount) {
    this.modalService.open(template, { size: 'sm' }).result.then(() => {

      const accountOperationHelper = <AccountOperationHelper<BotAccount>>{
        AccountOperation: AccountOperation.DeleteAccount,
        Account: account
      };
      this.manageAccounts(accountOperationHelper)
    }, (rejectedReason) => { }
    );
  }

  private manageAccounts(accountOperationHelper: AccountOperationHelper<BotAccount>) {

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
      case AccountOperation.AssignToDifferentBotAccount:
        this.handleAssignAccountToDifferentBot(accountWithUpdatedData);
        break;
    }
  }

  private handleAddNewAccountAction(newAccount: BotAccount) {
    this.accountService.addAccount(newAccount).subscribe((insertedAccount) => {
      this.notificationService.showSuccessToastr('Account has been successfully added !', '');
      this.accounts.push(insertedAccount);
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr("Account hasn't been saved. Is the API running ?", 'Whoop !'));
  }

  private handleUpdateAccountAction(updatedAccount: BotAccount) {
    this.accountService.updateAccount(updatedAccount).subscribe(() => {
      this.notificationService.showSuccessToastr('Account has been successfully updated !', '');
      let accountIndex = this.accounts.findIndex(account => account.accountId == updatedAccount.accountId);
      this.accounts.splice(accountIndex, 1, updatedAccount);
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr("Account hasn't been updated. Is the API running ?", 'Whoop !'));
  }

  private handleDeleteAccountAction(accountToDelete: BotAccount) {
    this.accountService.deleteAccount(accountToDelete.accountId).subscribe(() => {
      this.notificationService.showSuccessToastr('Account has been successfully deleted', '');
      let accountIndex = this.accounts.findIndex(account => account.accountId == accountToDelete.accountId);
      this.accounts.splice(accountIndex, 1);
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr('Account deletion failed. Is the API running', 'Whoop !'));
  }

  private handleAssignAccountToDifferentBot(accountToAssign: BotAccount) {
    // 1. Update the botId in the database
    this.accountService.updateAccount(accountToAssign).subscribe(() => {
      // 2. Remove the account object from array of current accounts for bot
      let accountIndex = this.accounts.findIndex(account => account.accountId == accountToAssign.accountId);
      this.accounts.splice(accountIndex, 1);
      // 3. Assign the account to different bot card
      this.accountService.assignAccountToBot(accountToAssign);
      this.notificationService.showSuccessToastr(`Account has been successfully assigned to bot with ID:${accountToAssign.botId} !`, '');
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr("Account hasn't been updated. Is the API running ?", 'Whoop !'));
  }
}
