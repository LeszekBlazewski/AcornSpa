import { Injectable } from '@angular/core';
import { FakeBackendProviderBase } from './fake-backend-provider-base';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Config } from '../models/config';
import { QueueType } from '../enums/queue-type.enum';
import { AiConfig } from '../enums/ai-config.enum';

const configs: Config[] = [
    {
        botId: 1,
        queueType: QueueType.Beginner,
        aiConfig: AiConfig.Follow,
        path: `C:/Riot Games/League of Legends/`,
        overwriteConfig: true,
        closeBrowser: false,
        noActionTimeout: 100
    },
    {
        botId: 2,
        queueType: QueueType.Intermediate,
        aiConfig: AiConfig.LanerLite,
        path: `C:/Riot Games/League of Legends/`,
        overwriteConfig: true,
        closeBrowser: true,
        noActionTimeout: 500
    },
    {
        botId: 3,
        queueType: QueueType.Intro,
        aiConfig: AiConfig.Laner,
        path: `G:/Riot Games/League of Legends/`,
        overwriteConfig: false,
        closeBrowser: false,
        noActionTimeout: 300
    },
    {
        botId: 4,
        queueType: QueueType.Intro,
        aiConfig: AiConfig.LanerLite,
        path: `C:/Riot Games/League of Legends/`,
        overwriteConfig: false,
        closeBrowser: true,
        noActionTimeout: 800
    },
    {
        botId: 5,
        queueType: QueueType.Beginner,
        aiConfig: AiConfig.Follow,
        path: `C:/Riot Games/League of Legends/`,
        overwriteConfig: true,
        closeBrowser: false,
        noActionTimeout: 100
    },
    {
        botId: 6,
        queueType: QueueType.Beginner,
        aiConfig: AiConfig.Laner,
        path: `C:/Riot Games/League of Legends/`,
        overwriteConfig: true,
        closeBrowser: true,
        noActionTimeout: 400
    },
    {
        botId: 7,
        queueType: QueueType.Beginner,
        aiConfig: AiConfig.Follow,
        path: `C:/Riot Games/League of Legends/`,
        overwriteConfig: true,
        closeBrowser: true,
        noActionTimeout: 900
    },
    {
        botId: 8,
        queueType: QueueType.Beginner,
        aiConfig: AiConfig.LanerLite,
        path: `C:/Riot Games/League of Legends/`,
        overwriteConfig: false,
        closeBrowser: false,
        noActionTimeout: 900
    },
    {
        botId: 9,
        queueType: QueueType.Beginner,
        aiConfig: AiConfig.Laner,
        path: `C:/Riot Games/League of Legends/`,
        overwriteConfig: true,
        closeBrowser: true,
        noActionTimeout: 760
    },
    {
        botId: 10,
        queueType: QueueType.Beginner,
        aiConfig: AiConfig.LanerLite,
        path: `C:/Riot Games/League of Legends/`,
        overwriteConfig: false,
        closeBrowser: true,
        noActionTimeout: 800
    }
];

@Injectable()
export class FakeBackendConfig extends FakeBackendProviderBase {

    protected handleRoute(request: HttpRequest<any>, next: HttpHandler) {
        switch (true) {
            case request.url.match(new RegExp(`${environment.configsUrl}[0-9]+`)) && request.method === 'GET':
                return this.getConfig(request.url);
            case request.url.endsWith(environment.configsUrl) && request.method === 'PUT':
                return this.updateConfig(request.body);
            default:
                return next.handle(request);
        }
    }

    private getConfig(url: string) {
        const botId = this.extractNumberFromUrl(url);
        const config: Config = configs.find(config => config.botId === botId);
        return this.httpOk(config);
    }


    private updateConfig(body) {
        const updatedConfig: Config = JSON.parse(body);
        updatedConfig.queueType = <QueueType>this.convertStringToEnum(updatedConfig.queueType);
        updatedConfig.aiConfig = <AiConfig>this.convertStringToEnum(updatedConfig.aiConfig);
        let accountIndex = configs.findIndex(config => config.botId === updatedConfig.botId);
        configs.splice(accountIndex, 1, updatedConfig);
        return this.httpOk(updatedConfig);
    }
}