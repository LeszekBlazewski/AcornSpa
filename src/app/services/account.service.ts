import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BaseService } from "./base.service";
import { Account } from "../models/account"

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private readonly ACCOUNT_API_URL = 'accounts/';

    private assignAccountSubject = new Subject<Account>();

    constructor(private baseService: BaseService) { }

    public getAccountsForBot(botId: number): Observable<Account[]> {
        const url = this.ACCOUNT_API_URL + 'bot/' + botId.toString();
        return this.baseService.get(url);
    }

    public updateAccount(account: Account): Observable<any> {
        const url = this.ACCOUNT_API_URL + account.accountId.toString();
        return this.baseService.put(url, account);
    }

    public deleteAccount(accountId: Number): Observable<any> {
        const url = this.ACCOUNT_API_URL + accountId.toString();
        return this.baseService.delete(url);
    }

    public addAccount(account: Account): Observable<Account> {
        return this.baseService.post(this.ACCOUNT_API_URL, account);
    }

    public assignAccountToBot(account: Account) {
        this.assignAccountSubject.next(account);
    }

    public getAssignedAccount(): Observable<Account> {
        return this.assignAccountSubject.asObservable();
    }
}