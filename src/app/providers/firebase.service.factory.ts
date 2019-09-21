import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FirebaseService } from '../services/firebase.service';
import { BaseFirebaseModel } from '../models/base-firebase-model';

@Injectable()
export class FirebaseServiceFactory {

    constructor(private database: AngularFirestore) { }

    public createSpecificFirebaseService<T extends BaseFirebaseModel>(documentLibraryPath: string) {
        return new FirebaseService<T>(documentLibraryPath, this.database);
    }
}

