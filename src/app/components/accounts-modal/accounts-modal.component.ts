import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountEditModalComponent } from "../account-edit-modal/account-edit-modal.component";
import { Account } from 'src/app/models/account';
import { Region } from 'src/app/enums/region.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { IconService } from "src/app/services/icon.service";

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
  }

  openDeleteAccountModal(template, accountId: number) {
    this.modalService.open(template, { size: 'sm' }).result.then((result) => {
      if (result) {
        this.accountService.deleteAccount(accountId).subscribe(
          () => this.notificationService.showSuccessToastr('Account has been successfully deleted', ''),
          (error: HttpErrorResponse) => this.notificationService.showErrorToastr('Account deletion failed. Is the API running', 'Whoop !')
        )
      }
    });
  }
}
