import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { Bot } from '../models/bot';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class BotService {

    private readonly BOT_API_URL = environment.botsUrl;

    constructor(private baseService: BaseService) { }

    public getBot(botId: number): Observable<Bot> {
        const url = this.BOT_API_URL + botId.toString();
        return this.baseService.get(url);
    }

    public getAllBots(): Observable<Bot[]> {
        return this.baseService.get(this.BOT_API_URL);
    }

    public addNewBot(bot: Bot): Observable<Bot> {
        return this.baseService.post(this.BOT_API_URL, bot);
    }

    public updateBotData(bot: Bot): Observable<any> {
        const url = this.BOT_API_URL + bot.botId.toString();
        return this.baseService.put(url, bot);
    }

    public deleteBot(botId: number): Observable<any> {
        const url = this.BOT_API_URL + botId.toString();
        return this.baseService.delete(url);
    }
}