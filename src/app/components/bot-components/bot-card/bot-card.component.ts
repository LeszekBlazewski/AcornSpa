import { Component, OnInit, Input } from '@angular/core';
import { Bot } from 'src/app/models/bot';
import { BotService } from 'src/app/services/bot.service';
import { LogService } from 'src/app/services/log.service';
import { BotAccountService } from 'src/app/services/bot-account.service';
import { BotOrder } from 'src/app/enums/bot-order.enum';
import { Log } from 'src/app/models/log';

import { Subscription, Subject, Observable } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { BotAccount } from 'src/app/models/botAccount';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigModalComponent } from "../../config-modal/config-modal.component";
import { BotAccountsModalComponent } from "../../account-components/account-list-components/bot-accounts-modal/bot-accounts-modal.component";
import { NotificationService } from 'src/app/services/notification.service';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';


@Component({
  selector: 'app-bot-card',
  templateUrl: './bot-card.component.html',
  styleUrls: ['./bot-card.component.scss']
})
export class BotCardComponent implements OnInit {

  @Input() bot: Bot;

  componenetSubscriptions: Subscription[] = [];

  emptyBotStatusSubject = new Subject();

  accountsForBot: BotAccount[];

  BotOrders = BotOrder;

  botOrderKeys = Object.keys(BotOrder).filter(k => typeof BotOrder[k as any] === "number");

  currentLog$: Observable<Log>;

  updateStatusForm: FormGroup;

  submitted = false;

  constructor(private botService: BotService,
    private logService: LogService,
    private botAccountService: BotAccountService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private notificationService: NotificationService) { }

  ngOnInit() {

    this.currentLog$ = this.logService.getLatestLogForBot(this.bot.botId);

    this.createSubscriptions();

    this.botAccountService.getAccountsForBot(this.bot.botId)
      .subscribe(accountsForBot => setTimeout(() =>
        this.accountsForBot = accountsForBot, 400),
        (error: HttpErrorResponse) => this.notificationService.showErrorToastr(`Accounts for botID:${this.bot.botId} couldn't be fetched. Is the API running ?`, 'Whoop !'));

    this.updateStatusForm = this.formBuilder.group({
      botStatus: [null, Validators.required]
    })

  }

  ngOnDestroy() {
    this.componenetSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private createSubscriptions() {

    // this.componenetSubscriptions.push(timer(0, 1000).pipe(
    //   switchMap(() => this.logService.getLatestLogForBot(this.bot.botId))
    // ).subscribe(log => this.currentLog = log));


    this.componenetSubscriptions.push(this.emptyBotStatusSubject.pipe(
      debounceTime(3000)
    ).subscribe(() => this.submitted = false));

    this.componenetSubscriptions.push(this.botAccountService.getAssignedAccount().subscribe((receivedAccount) => {
      if (this.bot.botId == receivedAccount.botId)
        this.accountsForBot.push(receivedAccount);
    }));
  }

  updateBotStatus() {

    this.submitted = true;
    this.emptyBotStatusSubject.next();

    // stop here if form is invalid
    if (this.updateStatusForm.invalid)
      return;

    let newBot = <Bot>{
      clientId: this.bot.clientId,
      botId: this.bot.botId,
      botOrder: BotOrder[<string>this.form.botStatus.value]
    };

    this.botService.updateObjectInCollection(newBot)
      .subscribe(updatedBot => {
        this.notificationService.showSuccessToastr('Action executed successfully', '');
        this.submitted = false;
        this.updateStatusForm.reset();
        this.bot = updatedBot;
      },
        (error: HttpErrorResponse) =>
          this.notificationService.showErrorToastr("Action not executed. Is the API running ?", 'Whoop !'));

  }

  get form() { return this.updateStatusForm.controls; }

  openConfigModal() {
    const modalRef = this.modalService.open(ConfigModalComponent)
    modalRef.componentInstance.inputBotId = this.bot.botId;
  }

  openAccountsModal() {
    const modalRef = this.modalService.open(BotAccountsModalComponent, { size: 'lg', windowClass: "modal-mid-size" })
    modalRef.componentInstance.accounts = this.accountsForBot;
    modalRef.componentInstance.referencedBotId = this.bot.botId;
    modalRef.componentInstance.componentHeader = 'Account list for BotID';
  }

  openDeleteBotModal() {

    const modalReference = this.modalService.open(DeleteModalComponent, { size: 'sm' });

    modalReference.componentInstance.modalHeader = "Bot deletion";

    modalReference.componentInstance.modalBody = `Are you sure you want to delete selected bot with ID:${this.bot.botId} ? Accounts assigned to bot will be returned to fresh accounts list.`;

    modalReference.componentInstance.modalWarning = 'This operation can not be undone.';

    modalReference.result.then(() => {
      this.botService.deleteObjectFromCollection(this.bot.clientId).subscribe(() => {
        this.botService.notifyBotToDelete(this.bot.botId);
        this.notificationService.showSuccessToastr('Bot has been deleted', '')
      },
        (error: HttpErrorResponse) => this.notificationService.showErrorToastr(`Bot couldn't be deleted. Is the API running ?`, 'Whoop !'));
    }, (rejectedReason) => { });
  }
}
