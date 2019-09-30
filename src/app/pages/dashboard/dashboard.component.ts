import { Component, OnInit } from "@angular/core";
import { BotService } from 'src/app/services/bot.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bot } from 'src/app/models/bot';
import { HttpErrorResponse } from '@angular/common/http';
import { BotAddModalComponent } from 'src/app/components/bot-components/bot-add-modal/bot-add-modal.component';
import { NotificationService } from 'src/app/services/notification.service';
import { Subscription, forkJoin } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfigService } from 'src/app/services/config.service';
import { Config } from 'src/app/models/config';
import { AiConfig } from 'src/app/enums/ai-config.enum';
import { QueueType } from 'src/app/enums/queue-type.enum';
import { LevelingModel } from 'src/app/enums/leveling-model.enum';
import { Log } from 'src/app/models/log';
import { firestore } from 'firebase/app';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bots: Bot[];

  deleteBotFromArraySubscription = new Subscription();

  public isDataLoading: boolean;

  constructor(private botService: BotService,
    private configService: ConfigService,
    private logService: LogService,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit() {

    this.isDataLoading = true;
    this.ngxService.startLoader('loader-bots');
    this.botService.getAllFromCollection()
      .subscribe(bots => {
        this.ngxService.stopLoader('loader-bots');
        setTimeout(() => {
          this.bots = bots;
          this.isDataLoading = false;
        }, 1100);
      }, (error: HttpErrorResponse) => {
        this.ngxService.stopLoader('loader-get-accounts');
        setTimeout(() => this.isDataLoading = false, 1100);
        this.notificationService.showErrorToastr(error.toString(), 'Whoop !');
      });

    this.deleteBotFromArraySubscription = this.botService.getBotToDelete().subscribe(botId =>
      this.bots = this.bots.filter(bot => bot.botId != botId))
  }

  ngOnDestroy() {
    this.deleteBotFromArraySubscription.unsubscribe();
  }

  public openCreateNewBotModal() {
    this.modalService.open(BotAddModalComponent).result.then(newBot => {

      // create default config for bot
      const defaultConfig: Config = {
        botId: newBot.botId,
        aiConfig: AiConfig.Follow,
        queueType: QueueType.Intro,
        path: "C:\\riotgames\\leagueoflegends",
        overwriteConfig: true,
        closeBrowser: false,
        noActionTimeout: 300,
        disableWindowsUpdate: true,
        desiredLevel: 15,
        levelingModel: LevelingModel.Classic
      }

      // create default log for bot
      const defaultLog: Log = {
        botId: newBot.botId,
        date: firestore.Timestamp.now(),
        status: 'New bot created'
      }

      // save new bot && his default config in database
      const addBotAccount$ = this.botService.addToCollection(newBot);
      const addBotConfig$ = this.configService.addToCollection(defaultConfig);
      const addLog$ = this.logService.addToCollection(defaultLog);


      forkJoin(addBotAccount$, addBotConfig$, addLog$).subscribe(
        ([createdBot, config, log]: [Bot, Config, Log]) => {
          this.notificationService.showSuccessToastr('Bot has been successfully created', '');
          this.notificationService.showSuccessToastr(`Default config for bot:${config.botId} has been created !`, '');
          this.notificationService.showSuccessToastr(`Default log for botId:${log.botId} has been created !`, '');
          this.bots.push(createdBot);
        }, (error: HttpErrorResponse) =>
        this.notificationService.showErrorToastr(error.error, 'Whoop !'))
    }, (rejectedReason) => { });
  }
}