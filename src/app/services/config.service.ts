import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { Config } from '../models/config';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private readonly CONFIG_API_URL = environment.configsUrl;

    constructor(private baseService: BaseService) { }

    public getConfig(botId: number): Observable<Config> {
        const url = this.CONFIG_API_URL + botId.toString();
        return this.baseService.get(url);
    }

    public updateConfig(config: Config): Observable<any> {
        return this.baseService.put(this.CONFIG_API_URL, config);
    }
}