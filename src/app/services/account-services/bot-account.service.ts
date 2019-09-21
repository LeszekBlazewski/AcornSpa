import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { BotAccount } from '../../models/botAccount';
import { environment } from 'src/environments/environment';
import { FirebaseService } from '../firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


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

    public detachAccountFromBot(accountId: number): Observable<any> {
        // const url = this.ACCOUNT_API_URL + accountId.toString() + '/detach';
        // return this.baseService.post(url, undefined);
        return of(null);
    }


    public assignAccountToBot(account: BotAccount) {
        this.assignAccountSubject.next(account);
    }

    public getAssignedAccount(): Observable<BotAccount> {
        return this.assignAccountSubject.asObservable();
    }
}