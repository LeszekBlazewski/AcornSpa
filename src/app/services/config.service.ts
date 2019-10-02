import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Config } from '../models/config';
import { environment } from 'src/environments/environment';
import { FirebaseService } from './firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ConfigService extends FirebaseService<Config> {

    constructor(protected database: AngularFirestore) {
        super(environment.configsCollection, database);
    }

    public getConfigByBotId(botId: number): Observable<Config[]> {
        return this.database.collection<Config>(environment.configsCollection, ref =>
            ref.where('botId', '==', botId))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        const config = a.payload.doc.data() as Config;
                        config.clientId = a.payload.doc.id;
                        return config;
                    })
                })
            );
    }
}