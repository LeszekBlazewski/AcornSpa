import { Component, OnInit, Input } from '@angular/core';
import { Bot } from 'src/app/models/bot';
import { BotService } from 'src/app/services/bot.service';
import { LogService } from 'src/app/services/log.service';
import { AccountService } from 'src/app/services/account.service';
import { BotOrder } from 'src/app/enums/bot-order.enum';
import { Log } from 'src/app/models/log';

import { timer, Subscription } from 'rxjs';
import { switchMap } from "rxjs/operators";
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-bot-card',
  templateUrl: './bot-card.component.html',
  styleUrls: ['./bot-card.component.scss']
})
export class BotCardComponent implements OnInit {

  @Input() bot: Bot;

  pollingSubscriptions: Subscription[] = [];

  accountsForBot: Account[];

  BotOrders = BotOrder;

  currentLog: Log;

  constructor(private botService: BotService, private logService: LogService, private accountService: AccountService) { }

  ngOnInit() {
    //this.createSubscriptions();

    // REMOVE THIS (TEMP FOR NOT KILLIING DATABSE)
    this.logService.getLatestLogForBot(this.bot.botId)
      .subscribe(log => this.currentLog = log);

    this.accountService.getAccountsForBot(this.bot.botId)
      .subscribe(accountsForBot => this.accountsForBot = accountsForBot);
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


  }

}
