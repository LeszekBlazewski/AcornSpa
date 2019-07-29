import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Bot } from 'src/app/models/bot';
import { BotService } from 'src/app/services/bot.service';
import { LogService } from 'src/app/services/log.service';
import { AccountService } from 'src/app/services/account.service';
import { BotOrder } from 'src/app/enums/bot-order.enum';
import { Log } from 'src/app/models/log';

import { timer, Subscription, Subject } from 'rxjs';
import { switchMap, debounceTime } from "rxjs/operators";
import { Account } from 'src/app/models/account';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigModalComponent } from "../config-modal/config-modal.component";


@Component({
  selector: 'app-bot-card',
  templateUrl: './bot-card.component.html',
  styleUrls: ['./bot-card.component.scss']
})
export class BotCardComponent implements OnInit {

  @Input() bot: Bot;

  pollingSubscriptions: Subscription[] = [];

  emptyBotStatusSubject = new Subject();

  accountsForBot: Account[];

  BotOrders = BotOrder;

  keys = Object.keys(BotOrder).filter(k => typeof BotOrder[k as any] === "number");

  currentLog: Log;

  updateStatusForm: FormGroup;

  submitted = false;

  constructor(private botService: BotService,
    private logService: LogService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

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

    //  END OF REMOVE

    this.accountService.getAccountsForBot(this.bot.botId)
      .subscribe(accountsForBot => this.accountsForBot = accountsForBot);

    this.updateStatusForm = this.formBuilder.group({
      botStatus: [null, Validators.required]
    })

  }

  ngOnDestroy() {
    this.pollingSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private createSubscriptions() {

    this.pollingSubscriptions.push(timer(0, 1000).pipe(
      switchMap(() => this.botService.getBot(this.bot.botId))
    ).subscribe(bot => this.bot = bot));

    this.pollingSubscriptions.push(timer(0, 1000).pipe(
      switchMap(() => this.logService.getLatestLogForBot(this.bot.botId))
    ).subscribe(log => this.currentLog = log));

    this.pollingSubscriptions.push(this.emptyBotStatusSubject.pipe(
      debounceTime(3000)
    ).subscribe(() => this.submitted = false));

  }

  updateBotStatus() {

    this.submitted = true;
    this.emptyBotStatusSubject.next();

    // stop here if form is invalid
    if (this.updateStatusForm.invalid)
      return;

    let newBot = <Bot>{};

    newBot.botId = this.bot.botId;
    newBot.botOrder = this.f.botStatus.value;

    this.botService.updateBotData(newBot)
      .subscribe(acceptedBotOrder =>
        this.bot.botOrder = acceptedBotOrder
      ), ((error: HttpErrorResponse) =>
        console.log(error.message));

  }

  get f() { return this.updateStatusForm.controls; }
  get botStatus() { return this.updateStatusForm.get('botStatus'); }

  openConfigModal() {
    const modalRef = this.modalService.open(ConfigModalComponent)
    modalRef.componentInstance.botId = this.bot.botId;
  }
}
