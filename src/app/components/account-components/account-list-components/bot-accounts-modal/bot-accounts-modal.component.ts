import { Component, OnInit, Input } from '@angular/core';
import { BotAccountService } from 'src/app/services/account-services/bot-account.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BotAccountEditModalComponent } from "../../account-edit-modals/bot-account-edit-modal/bot-account-edit-modal.component";
import { BotAccount } from 'src/app/models/account';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountOperationHelper } from 'src/app/helpers/account-operation.helper';
import { AccountListBase } from '../account-list-base';
import { IconService } from 'src/app/services/icon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountOperation } from 'src/app/enums/account-operation.enum';
import { DeleteModalComponent } from 'src/app/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-bot-accounts-modal',
  templateUrl: './bot-accounts-modal.component.html',
  styleUrls: ['./bot-accounts-modal.component.scss']
})
export class BotAccountsModalComponent extends AccountListBase<BotAccount> implements OnInit {

  @Input() referencedBotId: number;

  constructor(private botAccountService: BotAccountService,
    private notificationService: NotificationService,
    public activeModal: NgbActiveModal,
    protected iconService: IconService,
    protected modalService: NgbModal,
  ) {
    super(iconService, modalService);
  }

  ngOnInit() {
  }

  public openSpecificAccountModal(account: BotAccount) {
    const modalRef = this.modalService.open(BotAccountEditModalComponent);

    modalRef.componentInstance.account = account;

    modalRef.componentInstance.referencedBotId = this.referencedBotId;

    modalRef.result.then((accountOperationHelper: AccountOperationHelper<BotAccount>) => {

      if (accountOperationHelper.AccountOperation == AccountOperation.AssignToDifferentBotAccount)
        this.handleAssignAccountToDifferentBot(accountOperationHelper.Account);
      else
        this.manageAccounts(accountOperationHelper);
    },
      (rejectedReason) => { }
    );
  }

  public openDetachAccountModal(accountId: number) {
    const modalReference = this.modalService.open(DeleteModalComponent, { size: 'sm' });

    modalReference.componentInstance.modalHeader = "Detach account";

    modalReference.componentInstance.modalBody = `Are you sure you want to detach account with ID:${accountId} ?
    Selected account will be returned to fresh account list.`;

    modalReference.result.then(() => {
      this.botAccountService.detachAccountFromBot(accountId).subscribe(() => {
        this.removeAccountFromArray(accountId);
        this.notificationService.showSuccessToastr('Accunt has been successfully detached', '');
      },
        (error: HttpErrorResponse) => this.notificationService.showErrorToastr(error.error, 'Whoop !'))
    }, (rejectedReason) => { }
    );
  }

  protected handleAddNewAccountAction(newAccount: BotAccount) {
    this.botAccountService.addAccount(newAccount).subscribe((insertedAccount) => {
      this.notificationService.showSuccessToastr('Account has been successfully added', '');
      this.accounts.push(insertedAccount);
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr("Account hasn't been saved. Is the API running ?", 'Whoop !'));
  }

  protected handleUpdateAccountAction(updatedAccount: BotAccount) {
    this.botAccountService.updateAccount(updatedAccount).subscribe(() => {
      this.notificationService.showSuccessToastr('Account has been successfully updated', '');
      let accountIndex = this.accounts.findIndex(account => account.accountId == updatedAccount.accountId);
      this.accounts.splice(accountIndex, 1, updatedAccount);
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr("Account hasn't been updated. Is the API running ?", 'Whoop !'));
  }

  protected handleDeleteAccountAction(accountToDelete: BotAccount) {
    this.botAccountService.deleteAccount(accountToDelete.accountId).subscribe(() => {
      this.notificationService.showSuccessToastr('Account has been successfully deleted', '');
      this.removeAccountFromArray(accountToDelete.accountId);
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr('Account deletion failed. Is the API running ?', 'Whoop !'));
  }

  private handleAssignAccountToDifferentBot(accountToAssign: BotAccount) {
    // 1. Update the botId in the database
    this.botAccountService.updateAccount(accountToAssign).subscribe(() => {
      // 2. Remove the account object from array of current accounts for bot
      this.removeAccountFromArray(accountToAssign.accountId);
      // 3. Assign the account to different bot card
      this.botAccountService.assignAccountToBot(accountToAssign);
      this.notificationService.showSuccessToastr(`Account has been successfully assigned to bot with ID:${accountToAssign.botId}`, '');
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr("Account hasn't been updated. Is the API running ?", 'Whoop !'));
  }
}
