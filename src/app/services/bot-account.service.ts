import { Injectable } from "@angular/core";
import { Observable, Subject, from, forkJoin } from "rxjs";
import { BotAccount } from '../models/botAccount';
import { environment } from 'src/environments/environment';
import { FirebaseService } from './firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { BaseAccount } from '../models/baseAccount';


@Injectable({
    providedIn: 'root'
})
export class BotAccountService extends FirebaseService<BotAccount> {

    private assignAccountSubject = new Subject<BotAccount>();

    constructor(protected database: AngularFirestore) {
        super(environment.botsAccountsCollection, database);
    }

    public getAccountsForBot(botId: number): Observable<BotAccount[]> {
        return this.database.collection<BotAccount>(environment.botsAccountsCollection, ref =>
            ref.where('botId', '==', botId))
            .snapshotChanges()
            .pipe(
                map(botAccounts => {
                    return botAccounts.map(doc => {
                        const data = doc.payload.doc.data() as BotAccount;
                        data.clientId = doc.payload.doc.id;
                        return data;
                    });
                })
            );
    }

    public detachAccountFromBot(account: BotAccount): Observable<any> {

        const deleteBotAccount$ = this.deleteObjectFromCollection(account.clientId);

        const addNewFreshAccount$ = new Promise<BaseAccount>((resolve, reject) => {

            const baseAccount: BaseAccount = <BaseAccount>{
                accountId: account.accountId,
                birthDate: account.birthDate,
                login: account.login,
                password: account.password,
                region: account.region
            }

            this.database.collection<BaseAccount>(environment.freshAccountsCollection).add(baseAccount).then(
                ref => {
                    const newData = account;
                    newData.clientId = ref.id
                    resolve(newData);
                })
        });

        return forkJoin([deleteBotAccount$, from(addNewFreshAccount$)]);
    }


    public assignAccountToBot(account: BotAccount) {
        this.assignAccountSubject.next(account);
    }

    public getAssignedAccount(): Observable<BotAccount> {
        return this.assignAccountSubject.asObservable();
    }
}