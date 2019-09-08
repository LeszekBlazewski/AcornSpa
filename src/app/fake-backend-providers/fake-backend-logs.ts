import { Injectable } from '@angular/core';
import { FakeBackendProviderBase } from './fake-backend-provider-base';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Log } from '../models/log';

const date: Date = new Date();

const statuses: string[] = [
    'Killing enemy',
    'Recalling to base',
    'Following other bots',
    'Respawning',
    'Moving forward',
    'Coming back to base',
    'Recalling',
    'Fighting with opponent'
]

const logs: Log[] = [
    {
        botId: 1,
        status: statuses[0],
        date: date
    },
    {
        botId: 2,
        status: statuses[1],
        date: new Date(date.getTime() - 60000)
    },
    {
        botId: 3,
        status: statuses[2],
        date: new Date(date.getTime() - 120000)
    },
    {
        botId: 4,
        status: statuses[3],
        date: new Date(date.getTime())
    },
    {
        botId: 5,
        status: statuses[4],
        date: new Date(date.getTime() - 180000)
    },
    {
        botId: 6,
        status: statuses[5],
        date: new Date(date.getTime() - 240000)
    },
    {
        botId: 7,
        status: statuses[6],
        date: new Date(date.getTime())
    },
    {
        botId: 9,
        status: statuses[7],
        date: new Date(date.getTime() - 180000)
    }
];

@Injectable()
export class FakeBackendLogs extends FakeBackendProviderBase {

    protected handleRoute(request: HttpRequest<any>, next: HttpHandler) {
        switch (true) {
            case request.url.endsWith(environment.logsUrl) && request.method === 'GET':
                return this.getAllLogs();
            case request.url.match(new RegExp(`${environment.logsUrl}[0-9]+/latest`)) && request.method === 'GET':
                return this.getLatestLogForBot(request.url);
            default:
                return next.handle(request);
        }
    }

    private getAllLogs() {
        return this.httpOk(logs);
    }

    private getLatestLogForBot(url: string) {
        const botId = this.extractNumberFromUrl(url);
        const logForBot = logs.find(l => l.botId == botId);
        let logCopy: Log;
        if (logForBot != undefined) {
            // create a copy of log when it exists in order to change the reference status value and not display it immediately on the view
            logCopy = { ...logForBot }
            logForBot.status = statuses[Math.floor(Math.random() * statuses.length)];
        } else
            logCopy = null;

        return this.httpOk(logCopy);
    }
}