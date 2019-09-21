import { Observable, from } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { BaseFirebaseModel } from '../models/base-firebase-model';


export class FirebaseService<T extends BaseFirebaseModel> {

    protected documentLibraryPath: string;

    protected dataBaseCollection: AngularFirestoreCollection<T>

    constructor(documentLibraryPath: string, protected database: AngularFirestore) {
        this.documentLibraryPath = documentLibraryPath;
        this.dataBaseCollection = this.database.collection(documentLibraryPath);
    }

    getById(identifier: string): Observable<T> {
        return this.dataBaseCollection
            .doc<T>(identifier)
            .snapshotChanges()
            .pipe(
                map(doc => {
                    if (doc.payload.exists) {
                        const data = doc.payload.data() as T;
                        data.clientId = doc.payload.id;
                        return data;
                    }
                })
            );
    }

    getAllFromCollection(): Observable<T[]> {
        return this.dataBaseCollection
            .snapshotChanges()
            .pipe(
                map(doucments => {
                    return doucments.map(doc => {
                        const data = doc.payload.doc.data() as T;
                        data.clientId = doc.payload.doc.id;
                        return data;
                    });
                })
            );
    }

    addToCollection(object: T): Observable<T> {
        delete object.clientId; // remove client id from object to not save it in database (it is always null)
        const promise = new Promise<T>((resolve, reject) => {
            this.dataBaseCollection.add(object).then(ref => {
                const newData = object;
                newData.clientId = ref.id
                resolve(newData);
            });
        });
        return from(promise);
    }


    updateObjectInCollection(object: T): Observable<T> {
        const objectId = object.clientId;
        delete object.clientId; // remove client id from object to not save it in database (it would duplicate document reference)
        const promise = new Promise<T>((resolve, reject) => {
            this.dataBaseCollection
                .doc<T>(objectId)
                .update(object)
                .then(() => {
                    object.clientId = objectId;
                    resolve(object);
                });
        });
        return from(promise);
    }

    deleteObjectFromCollection(identifier: string): Observable<any> {
        return from(this.dataBaseCollection.doc<T>(identifier).delete());
    }
}