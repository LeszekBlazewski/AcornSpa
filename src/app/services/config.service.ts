import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { Config } from '../models/config';


@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private readonly LOG_API_URL = 'configs/';

    constructor(private baseService: BaseService) { }

    public getConfig(botId: number): Observable<Config> {
        const url = this.LOG_API_URL + botId.toString();
        return this.baseService.get(url);
    }

    public updateConfig(config: Config): Observable<any> {
        return this.baseService.put(this.LOG_API_URL + config.botId.toString(), config);
    }
}