import { Component, OnInit } from "@angular/core";
import { BotService } from 'src/app/services/bot.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bot } from 'src/app/models/bot';
import { HttpErrorResponse } from '@angular/common/http';
import { BotAddModalComponent } from 'src/app/components/bot-components/bot-add-modal/bot-add-modal.component';
import { NotificationService } from 'src/app/services/notification.service';
import { Subscription } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bots: Bot[];

  deleteBotFromArraySubscription = new Subscription();

  constructor(private botService: BotService,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private ngxService: NgxUiLoaderService,
    private notificationSerice: NotificationService) { }

  // TODO implement handling error from API (When we get back 404)
  ngOnInit() {
    this.ngxService.startBackgroundLoader('loader-bots');
    this.botService.getAllBots()
      .subscribe(bots => {
        this.bots = bots;
        this.ngxService.stopBackgroundLoader('loader-bots');
      }, (error: HttpErrorResponse) => {
        this.ngxService.stopBackgroundLoader('loader-bots');
        this.notificationSerice.showErrorToastr(error.toString(), '');
      });

    this.deleteBotFromArraySubscription = this.botService.getBotToDelete().subscribe(botId =>
      this.bots = this.bots.filter(bot => bot.botId != botId))
  }

  ngOnDestroy() {
    this.deleteBotFromArraySubscription.unsubscribe();
  }

  public openCreateNewBotModal() {
    this.modalService.open(BotAddModalComponent).result.then((newBot) =>
      this.botService.addNewBot(newBot).subscribe(createdBot => {
        this.notificationService.showSuccessToastr('Bot has been successfully created', '');
        this.bots.push(createdBot);
      }, (error: HttpErrorResponse) =>
          this.notificationService.showErrorToastr(error.error, 'Whoop !'))
      , (rejectedReason) => { });
  }
}