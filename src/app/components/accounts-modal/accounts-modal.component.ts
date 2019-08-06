import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountEditModalComponent } from "../account-edit-modal/account-edit-modal.component";
import { Account } from 'src/app/models/account';
import { Region } from 'src/app/enums/region.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-accounts-modal',
  templateUrl: './accounts-modal.component.html',
  styleUrls: ['./accounts-modal.component.scss']
})
export class AccountsModalComponent implements OnInit {

  constructor(private accountService: AccountService,
    private notificationService: NotificationService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
  ) { }

  @Input() accounts: Account[];

  @Input() referencedBotId: number;

  Regions = Region;

  ngOnInit() {

  }

  public getImageUrl(accountRegion: Region): String {
    let urlOfIcon = '//opgg-static.akamaized.net/css3/sprite/images/';
    switch (accountRegion) {
      case Region.Eune:
        urlOfIcon += 'regionFlag-eune.png';
        break;
      case Region.Euw:
        urlOfIcon += 'regionFlag-euw.png';
        break;
      case Region.Na:
        urlOfIcon += 'regionFlag-na.png';
      default:
        urlOfIcon = '';
    }
    return urlOfIcon;
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
