import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Log } from '../models/log';
import { environment } from 'src/environments/environment';
import { FirebaseService } from './firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class LogService extends FirebaseService<Log> {

    constructor(protected database: AngularFirestore) {
        super(environment.logsCollection, database);
    }

    public getLatestLogForBot(botId: number): Observable<Log> {
        const log$ = this.database.collection<Log>(environment.logsCollection, ref =>
            ref.where('botId', '==', botId).orderBy('date', 'desc').limit(1))
            .valueChanges()
            .pipe(
                map(log => {
                    return log[0];
                })
            );
        return log$;
    }
}