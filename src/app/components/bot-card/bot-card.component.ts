import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Bot } from 'src/app/models/bot';
import { BotService } from 'src/app/services/bot.service';
import { LogService } from 'src/app/services/log.service';
import { BotAccountService } from 'src/app/services/bot-account.service';
import { BotOrder } from 'src/app/enums/bot-order.enum';
import { Log } from 'src/app/models/log';

import { timer, Subscription, Subject } from 'rxjs';
import { switchMap, debounceTime } from "rxjs/operators";
import { BotAccount } from 'src/app/models/account';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigModalComponent } from "../config-modal/config-modal.component";
import { AccountsModalComponent } from "../accounts-modal/accounts-modal.component";
import { NotificationService } from 'src/app/services/notification.service';


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

  currentLog: Log;

  updateStatusForm: FormGroup;

  submitted = false;

  constructor(private botService: BotService,
    private logService: LogService,
    private accountService: BotAccountService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private notificationService: NotificationService) { }

  ngOnInit() {
    //this.createSubscriptions();

    // REMOVE SECTION
    // REMOVE THIS (TEMP FOR NOT KILLIING DATABSE)
    this.logService.getLatestLogForBot(this.bot.botId)
      .subscribe(log => this.currentLog = log);

    // remove this it is already in create subscriptions
    this.emptyBotStatusSubject.pipe(
      debounceTime(3000)
    ).subscribe(() => this.submitted = false);

    this.componenetSubscriptions.push(this.accountService.getAssignedAccount().subscribe((receivedAccount) => {
      if (this.bot.botId == receivedAccount.botId)
        this.accountsForBot.push(receivedAccount);
    }));

    //  END OF REMOVE

    this.accountService.getAccountsForBot(this.bot.botId)
      .subscribe(accountsForBot => this.accountsForBot = accountsForBot,
        (error: HttpErrorResponse) => this.notificationService.showErrorToastr("Accounts couldn't be fetched. Is the API running ?", 'Whoop !'));

    this.updateStatusForm = this.formBuilder.group({
      botStatus: [null, Validators.required]
    })

  }

  ngOnDestroy() {
    this.componenetSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private createSubscriptions() {

    this.componenetSubscriptions.push(timer(0, 1000).pipe(
      switchMap(() => this.botService.getBot(this.bot.botId))
    ).subscribe(bot => this.bot = bot));

    this.componenetSubscriptions.push(timer(0, 1000).pipe(
      switchMap(() => this.logService.getLatestLogForBot(this.bot.botId))
    ).subscribe(log => this.currentLog = log));

    this.componenetSubscriptions.push(this.emptyBotStatusSubject.pipe(
      debounceTime(3000)
    ).subscribe(() => this.submitted = false));

    this.componenetSubscriptions.push(this.accountService.getAssignedAccount().subscribe((receivedAccount) => {
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
      botId: this.bot.botId,
      botOrder: this.form.botStatus.value
    };

    this.botService.updateBotData(newBot)
      .subscribe(acceptedBotOrder => {
        this.notificationService.showSuccessToastr('Action executed successfully !', '');
        this.submitted = false;
        this.updateStatusForm.reset();
        this.bot.botOrder = acceptedBotOrder;
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
    const modalRef = this.modalService.open(AccountsModalComponent, { size: 'lg' })
    modalRef.componentInstance.accounts = this.accountsForBot;
    modalRef.componentInstance.referencedBotId = this.bot.botId;
  }
}
