import { Injectable } from '@angular/core';
import { FakeBackendProviderBase } from './fake-backend-provider-base';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { BotAccount } from '../models/account';
import { Region } from '../enums/region.enum';

const botAccounts: BotAccount[] = [
    {
        accountId: 1,
        botId: 1,
        region: Region.Eune,
        login: 'snake',
        password: 'jonatan',
        birthDate: new Date('1998-02-13'),
        level: 12,
        expPercentage: 45
    },
    {
        accountId: 2,
        botId: 1,
        region: Region.Euw,
        login: 'r3hab',
        password: 'supreme',
        birthDate: new Date('1997-02-13'),
        level: 25,
        expPercentage: 36
    },
    {
        accountId: 3,
        botId: 1,
        region: Region.Na,
        login: 'Aoki',
        password: 'mastermind',
        birthDate: new Date('1994-12-13'),
        level: 2,
        expPercentage: 17
    },
    {
        accountId: 4,
        botId: 2,
        region: Region.Euw,
        login: 'Kaskade',
        password: 'elprimo',
        birthDate: new Date('1997-06-19'),
        level: 16,
        expPercentage: 92
    },
    {
        accountId: 5,
        botId: 3,
        region: Region.Eune,
        login: 'diablo',
        password: 'musico',
        birthDate: new Date('2000-04-11'),
        level: 29,
        expPercentage: 68
    },
    {
        accountId: 6,
        botId: 3,
        region: Region.Eune,
        login: 'heldens',
        password: 'oliver',
        birthDate: new Date('1995-08-03'),
        level: 24,
        expPercentage: 18
    },
    {
        accountId: 7,
        botId: 4,
        region: Region.Euw,
        login: 'Marshmello',
        password: 'ethany123',
        birthDate: new Date('1998-02-13'),
        level: 21,
        expPercentage: 28
    },
    {
        accountId: 8,
        botId: 4,
        region: Region.Na,
        login: 'Hardwell',
        password: 'estimoro',
        birthDate: new Date('1992-09-07'),
        level: 10,
        expPercentage: 85
    },
    {
        accountId: 9,
        botId: 4,
        region: Region.Eune,
        login: 'Diplo',
        password: 'supermen123',
        birthDate: new Date('1992-01-12'),
        level: 5,
        expPercentage: 29
    },
    {
        accountId: 10,
        botId: 5,
        region: Region.Na,
        login: 'ILLENIUM',
        password: 'strangerGuy',
        birthDate: new Date('1992-07-19'),
        level: 9,
        expPercentage: 94
    },
    {
        accountId: 11,
        botId: 5,
        region: Region.Na,
        login: 'Tiesto',
        password: 'LaPlamas',
        birthDate: new Date('1997-09-15'),
        level: 25,
        expPercentage: 67
    },
    {
        accountId: 12,
        botId: 6,
        region: Region.Na,
        login: 'Zedd',
        password: 'zentixx1',
        birthDate: new Date('1994-09-28'),
        level: 4,
        expPercentage: 24
    },
    {
        accountId: 13,
        botId: 6,
        region: Region.Eune,
        login: 'Guetta',
        password: 'david908',
        birthDate: new Date('2005-08-13'),
        level: 15,
        expPercentage: 53
    },
    {
        accountId: 14,
        botId: 7,
        region: Region.Euw,
        login: 'Afrojack',
        password: 'musci541',
        birthDate: new Date('1997-01-30'),
        level: 9,
        expPercentage: 67
    },
    {
        accountId: 15,
        botId: 7,
        region: Region.Na,
        login: 'Harris',
        password: 'calvin902',
        birthDate: new Date('1991-12-13'),
        level: 9,
        expPercentage: 39
    },
    {
        accountId: 16,
        botId: 9,
        region: Region.Eune,
        login: 'Entisimo',
        password: 'Josh123576',
        birthDate: new Date('1993-05-23'),
        level: 24,
        expPercentage: 53
    },
    {
        accountId: 17,
        botId: 9,
        region: Region.Eune,
        login: 'Kshmr',
        password: 'Elkanteo',
        birthDate: new Date('1998-12-04'),
        level: 12,
        expPercentage: 12
    }
];

@Injectable()
export class FakeBackendBotAccounts extends FakeBackendProviderBase {

    protected handleRoute(request: HttpRequest<any>, next: HttpHandler) {
        switch (true) {
            case request.url.match(new RegExp(`${environment.botAccountsUrl}bot/[0-9]+`)) && request.method === 'GET':
                return this.getAccountsForBot(request.url);
            case request.url.endsWith(environment.botAccountsUrl) && request.method === 'POST':
                return this.addNewAccount(request.body);
            case request.url.endsWith(environment.botAccountsUrl) && request.method === 'PUT':
                return this.editAccount(request.body);
            case request.url.match(new RegExp(`${environment.botAccountsUrl}[0-9]+`)) && request.method === 'DELETE':
                return this.deletAccount(request.url);
            case request.url.match(new RegExp(`${environment.botAccountsUrl}[0-9]+/detach`)) && request.method === 'POST':
                return this.detachAccount(request.url);
            default:
                return next.handle(request);
        }
    }

    private getAccountsForBot(url: string) {
        const botId = this.extractNumberFromUrl(url);
        const accountsForBot = botAccounts.map((account) => account.botId == botId ? account : null)
            .filter(account => account !== null);

        return this.httpOk(accountsForBot);
    }

    private addNewAccount(body) {
        const newAccount: BotAccount = JSON.parse(body);
        newAccount.accountId = botAccounts.length + 1;
        botAccounts.push(newAccount);
        return this.httpOk(newAccount);
    }

    private editAccount(body) {
        const updatedAccount: BotAccount = JSON.parse(body);
        let accountIndex = botAccounts.findIndex(account => account.accountId == updatedAccount.accountId);
        botAccounts.splice(accountIndex, 1, updatedAccount);
        return this.httpOk(updatedAccount);
    }

    private detachAccount(url: string) {
        const accountId = this.extractNumberFromUrl(url);
        this.removeAccountFromArray(accountId);
        return this.httpOk();
    }

    private deletAccount(url: string) {
        const accountId = this.extractNumberFromUrl(url);
        this.removeAccountFromArray(accountId);
        return this.httpOk();
    }

    private removeAccountFromArray(accountId: number): void {
        const accountIndex = botAccounts.findIndex(account => account.accountId == accountId);
        botAccounts.splice(accountIndex, 1);
    }
}