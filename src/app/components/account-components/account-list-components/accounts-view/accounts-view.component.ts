import { Component, OnInit, Input } from '@angular/core';
import { AccountListBase } from '../account-list-base';
import { BaseAccount } from 'src/app/models/baseAccount';
import { IconService } from 'src/app/services/icon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountEditModalComponent } from '../../account-edit-modals/account-edit-modal/account-edit-modal.component';
import { AccountOperationHelper } from 'src/app/helpers/account-operation.helper';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FirebaseServiceFactory } from 'src/app/providers/firebase.service.factory';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.scss']
})
export class AccountsViewComponent extends AccountListBase<BaseAccount> implements OnInit {

  @Input() documentLibraryPath: string;

  private accountService: FirebaseService<BaseAccount>;

  constructor(protected iconService: IconService,
    protected modalService: NgbModal,
    private notificationService: NotificationService,
    private firebaseServiceFactory: FirebaseServiceFactory) {
    super(iconService, modalService);
  }

  ngOnInit() {
    this.accountService = this.firebaseServiceFactory.createSpecificFirebaseService<BaseAccount>(this.documentLibraryPath);
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
    this.accountService.addToCollection(newAccount).subscribe((insertedAccount) => {
      this.notificationService.showSuccessToastr('Account has been successfully added', '');
      this.accounts.push(insertedAccount);
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr("Account hasn't been saved. Is the API running ?", 'Whoop !'));
  }
  protected handleUpdateAccountAction(updatedAccount: BaseAccount): void {
    this.accountService.updateObjectInCollection(updatedAccount).subscribe(() => {
      this.notificationService.showSuccessToastr('Account has been successfully updated', '');
      let accountIndex = this.accounts.findIndex(account => account.accountId == updatedAccount.accountId);
      this.accounts.splice(accountIndex, 1, updatedAccount);
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr("Account hasn't been updated. Is the API running ?", 'Whoop !'));
  }
  protected handleDeleteAccountAction(accountToDelete: BaseAccount): void {
    this.accountService.deleteObjectFromCollection(accountToDelete.clientId).subscribe(() => {
      this.notificationService.showSuccessToastr('Account has been successfully deleted', '');
      this.removeAccountFromArray(accountToDelete.accountId);
    },
      (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr('Account deletion failed. Is the API running ?', 'Whoop !'));
  }

}
