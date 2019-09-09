import { Injectable } from '@angular/core';
import { FakeBackendProviderBase } from './fake-backend-provider-base';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Region } from '../enums/region.enum';
import { BaseAccount } from '../models/baseAccount';

const accounts: BaseAccount[] = [
    {
        accountId: 1,
        region: Region.Eune,
        login: 'Zozo',
        password: 'Markis123',
        birthDate: new Date('1968-02-13'),
    },
    {
        accountId: 2,
        region: Region.Euw,
        login: 'Menisio',
        password: 'Keyboard123',
        birthDate: new Date('1977-02-13'),
    },
    {
        accountId: 3,
        region: Region.Na,
        login: 'Kevin',
        password: 'Spacey654',
        birthDate: new Date('1994-12-13'),
    },
    {
        accountId: 4,
        region: Region.Euw,
        login: 'Flusha1',
        password: 'murtas654',
        birthDate: new Date('1997-06-19'),
    },
    {
        accountId: 5,
        region: Region.Eune,
        login: 'Pronax4',
        password: 'musico',
        birthDate: new Date('2000-04-11'),
    },
    {
        accountId: 6,
        region: Region.Eune,
        login: 'PhoneGeek',
        password: 'Samsung6890',
        birthDate: new Date('1995-08-03'),
    },
    {
        accountId: 7,
        region: Region.Euw,
        login: 'JellyFish8992',
        password: 'waterWhite',
        birthDate: new Date('1998-02-13'),
    },
    {
        accountId: 8,
        region: Region.Na,
        login: 'Beardoo',
        password: 'bada$12',
        birthDate: new Date('1992-09-07'),
    },
    {
        accountId: 9,
        region: Region.Eune,
        login: 'Spongebooy',
        password: 'buddar432',
        birthDate: new Date('1992-01-12'),
    },
    {
        accountId: 10,
        region: Region.Na,
        login: 'stormwind',
        password: 'strangerGuy12',
        birthDate: new Date('1992-07-19'),
    },
    {
        accountId: 11,
        region: Region.Na,
        login: 'Morowind',
        password: 'opel412',
        birthDate: new Date('1997-09-15'),
    },
    {
        accountId: 12,
        region: Region.Na,
        login: 'Teapot',
        password: 'justAJoke',
        birthDate: new Date('1994-09-28'),
    },
    {
        accountId: 13,
        region: Region.Eune,
        login: 'StickyNote',
        password: 'cameroon321',
        birthDate: new Date('2005-08-13'),
    },
    {
        accountId: 14,
        region: Region.Euw,
        login: 'Amnesty89',
        password: 'goHomeBOy1',
        birthDate: new Date('1997-01-30'),
    },
    {
        accountId: 15,
        region: Region.Na,
        login: 'GummyDuck',
        password: 'animalsPros123',
        birthDate: new Date('1991-12-13'),
    },
    {
        accountId: 16,
        region: Region.Eune,
        login: 'Starwars09',
        password: 'Josh123576',
        birthDate: new Date('1993-05-23'),
    },
    {
        accountId: 17,
        region: Region.Eune,
        login: 'BlueScreen',
        password: 'OfDeath!',
        birthDate: new Date('1998-12-04'),
    },
    {
        accountId: 18,
        region: Region.Eune,
        login: 'Endoimondo',
        password: 'Runner872!',
        birthDate: new Date('1998-12-04'),
    },
    {
        accountId: 19,
        region: Region.Eune,
        login: 'ParodyCenteral321',
        password: 'Comicon5212',
        birthDate: new Date('1998-12-04'),
    },
    {
        accountId: 20,
        region: Region.Eune,
        login: 'CandyBard52',
        password: 'BigBoy123!',
        birthDate: new Date('1998-12-04'),
    }
];

@Injectable()
export class FakeBackendAccounts extends FakeBackendProviderBase {

    protected handleRoute(request: HttpRequest<any>, next: HttpHandler) {
        switch (true) {
            case request.url.endsWith(environment.freshAccountsUrl) && request.method === 'GET':
            case request.url.endsWith(environment.readyAccountsUrl) && request.method === 'GET':
                return this.getAccounts(request.url);
            case request.url.endsWith(environment.freshAccountsUrl) && request.method === 'POST':
            case request.url.endsWith(environment.readyAccountsUrl) && request.method === 'POST':
                return this.addNewAccount(request.body);
            case request.url.match(new RegExp(`${environment.freshAccountsUrl}[0-9]+`)) && request.method === 'PUT':
            case request.url.match(new RegExp(`${environment.readyAccountsUrl}[0-9]+`)) && request.method === 'PUT':
                return this.editAccount(request.body);
            case request.url.match(new RegExp(`${environment.freshAccountsUrl}[0-9]+`)) && request.method === 'DELETE':
            case request.url.match(new RegExp(`${environment.readyAccountsUrl}[0-9]+`)) && request.method === 'DELETE':
                return this.deletAccount(request.url);
            default:
                return next.handle(request);
        }
    }

    private getAccounts(url: string) {
        let accountsToReturn: BaseAccount[];
        const halfOfTheArrayIndex = Math.floor(accounts.length / 2);
        if (url.endsWith(environment.freshAccountsUrl))
            accountsToReturn = accounts.slice(0, halfOfTheArrayIndex);
        else
            accountsToReturn = accounts.slice(halfOfTheArrayIndex, accounts.length);

        return this.httpOk(accountsToReturn);
    }

    private addNewAccount(body) {
        const newAccount: BaseAccount = JSON.parse(body);
        newAccount.accountId = accounts.length + 1;
        newAccount.region = <Region>this.convertStringToEnum(newAccount.region);
        accounts.push(newAccount);
        return this.httpOk(newAccount);
    }

    private editAccount(body) {
        const updatedAccount: BaseAccount = JSON.parse(body);
        let accountIndex = accounts.findIndex(account => account.accountId === updatedAccount.accountId);
        accounts.splice(accountIndex, 1, updatedAccount);
        return this.httpOk(updatedAccount);
    }

    private deletAccount(url: string) {
        return this.httpOk();
    }
}