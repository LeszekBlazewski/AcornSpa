import { BaseAccount } from '../../models/baseAccount';
import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class BaseAccountService extends FirebaseService<BaseAccount> {

    constructor(documentLibraryPath: string, protected database: AngularFirestore) {
        super(documentLibraryPath, database);
    }
}