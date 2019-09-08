import { Injectable } from '@angular/core';
import { FakeBackendProviderBase } from './fake-backend-provider-base';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Bot } from '../models/bot';
import { BotOrder } from '../enums/bot-order.enum';

const bots: Bot[] = [
    {
        botId: 1,
        botOrder: BotOrder.Start
    },
    {
        botId: 2,
        botOrder: BotOrder.Restart
    },
    {
        botId: 3,
        botOrder: BotOrder.Stop
    },
    {
        botId: 4,
        botOrder: BotOrder.Kill
    },
    {
        botId: 5,
        botOrder: BotOrder.Reboot
    },
    {
        botId: 6,
        botOrder: BotOrder.Restart
    },
    {
        botId: 7,
        botOrder: BotOrder.Stop
    },
    {
        botId: 8,
        botOrder: BotOrder.Start
    },
    {
        botId: 9,
        botOrder: BotOrder.Restart
    },
    {
        botId: 10,
        botOrder: BotOrder.Reboot
    },
];

@Injectable()
export class FakeBackendBots extends FakeBackendProviderBase {

    protected handleRoute(request: HttpRequest<any>, next: HttpHandler) {
        switch (true) {
            case request.url.endsWith(environment.botsUrl) && request.method === 'GET':
                return this.getAllBots();
            case request.url.endsWith(environment.botsUrl) && request.method === 'POST':
                return this.addNewBot(request.body);
            case request.url.match(new RegExp(`${environment.botsUrl}[0-9]+`)) && request.method === 'PUT':
                return this.updateBotData(request.body);
            case request.url.match(new RegExp(`${environment.botsUrl}[0-9]+`)) && request.method === 'DELETE':
                return this.deleteBot();
            default:
                return next.handle(request);
        }
    }

    private getAllBots() {
        return this.httpOk(bots);
    }

    private addNewBot(body) {
        const newBot: Bot = JSON.parse(body);
        if (bots.some(b => b.botId == newBot.botId))
            return this.httpError('Bot ID is already taken !');
        newBot.botOrder = BotOrder.Start;
        return this.httpOk(newBot);
    }

    private updateBotData(body) {
        const updatedBot: Bot = JSON.parse(body);
        return this.httpOk(BotOrder[updatedBot.botOrder]);
    }

    private deleteBot() {
        return this.httpOk();
    }
}