import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BaseService } from "../base.service";
import { BaseAccountService } from './base-account.service';
import { BotAccount } from '../../models/account';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class BotAccountService extends BaseAccountService<BotAccount> {

    private ACCOUNT_API_URL: string = environment.botAccountsUrl;

    private assignAccountSubject = new Subject<BotAccount>();

    constructor(protected baseService: BaseService) {
        super(baseService);
    }

    public getAccountsForBot(botId: number): Observable<BotAccount[]> {
        const url = this.ACCOUNT_API_URL + 'bot/' + botId.toString();
        return this.baseService.get(url);
    }

    public detachAccountFromBot(accountId: number): Observable<any> {
        const url = this.ACCOUNT_API_URL + accountId.toString() + '/detach';
        return this.baseService.post(url, undefined);
    }


    public assignAccountToBot(account: BotAccount) {
        this.assignAccountSubject.next(account);
    }

    public getAssignedAccount(): Observable<BotAccount> {
        return this.assignAccountSubject.asObservable();
    }

    /* overrides */

    public updateAccount(account: BotAccount): Observable<any> {
        return super.updateAccount(account, this.ACCOUNT_API_URL);
    }

    public deleteAccount(accountId: Number): Observable<any> {
        return super.deleteAccount(accountId, this.ACCOUNT_API_URL);
    }

    public addAccount(account: BotAccount): Observable<BotAccount> {
        return super.addAccount(account, this.ACCOUNT_API_URL);
    }
}