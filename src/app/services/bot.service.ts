import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Bot } from '../models/bot';
import { environment } from 'src/environments/environment';
import { FirebaseService } from './firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
    providedIn: 'root'
})
export class BotService extends FirebaseService<Bot> {

    private deleteBotFromArraySubject = new Subject<number>();

    constructor(protected database: AngularFirestore) {
        super(environment.botsCollection, database);
    }

    public notifyBotToDelete(botId: number) {
        this.deleteBotFromArraySubject.next(botId);
    }

    public getBotToDelete(): Observable<number> {
        return this.deleteBotFromArraySubject.asObservable();
    }
}