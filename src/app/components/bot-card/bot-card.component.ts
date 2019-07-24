import { Component, OnInit, Input } from '@angular/core';
import { Bot } from 'src/app/models/bot';
import { BotService } from 'src/app/services/bot.service';
import { LogService } from 'src/app/services/log.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-bot-card',
  templateUrl: './bot-card.component.html',
  styleUrls: ['./bot-card.component.scss']
})
export class BotCardComponent implements OnInit {

  @Input() bot: Bot;

  constructor(private botService: BotService, private logService: LogService, private accountService: AccountService) { }

  ngOnInit() {
  }
}
