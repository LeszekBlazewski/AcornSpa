import { BaseAccount } from '../../models/baseAccount';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BaseAccountService<T extends BaseAccount> {

    constructor(protected baseService: BaseService) {
    }

    public getAccounts(relativUrl: string): Observable<T[]> {
        return this.baseService.get(relativUrl);
    }

    public updateAccount(account: T, relativeUrl: string): Observable<any> {
        const url = relativeUrl + account.accountId.toString();
        return this.baseService.put(url, account);
    }

    public deleteAccount(accountId: Number, relativeUrl: string): Observable<any> {
        const url = relativeUrl + accountId.toString();
        return this.baseService.delete(url);
    }

    public addAccount(account: T, relativeUrl: string): Observable<T> {
        return this.baseService.post(relativeUrl, account);
    }
}