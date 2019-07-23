import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { Log } from '../models/log';


@Injectable({
    providedIn: 'root'
})
export class LogService {

    private readonly LOG_API_URL = 'logs/';

    constructor(private baseService: BaseService) { }

    public getLatestLogForBot(botId: number): Observable<Log> {
        const url = this.LOG_API_URL + botId.toString() + '/latest';
        return this.baseService.get(url);
    }

    public getAllLogsForBot(botId: number): Observable<Log[]> {
        return this.baseService.get(this.LOG_API_URL + botId.toString());
    }

    public deleteLog(botId: number): Observable<any> {
        const url = this.LOG_API_URL + botId.toString();
        return this.baseService.delete(url);
    }

    public addNewLog(log: Log): Observable<any> {
        return this.baseService.post(this.LOG_API_URL, log);
    }
}