import { Component, OnInit } from "@angular/core";
import { BotService } from 'src/app/services/bot.service';
import { Bot } from 'src/app/models/bot';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bots: Bot[];

  constructor(private botService: BotService) { }

  // TODO implement handling error from API (When we get back 404)
  ngOnInit() {
    this.botService.getAllBots()
      .subscribe(bots =>
        this.bots = bots
      ), ((error: HttpErrorResponse) =>
        console.log(error.message));
  }
}