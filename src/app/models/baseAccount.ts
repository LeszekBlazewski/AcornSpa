import { Region } from '../enums/region.enum';
import { BaseFirebaseModel } from './base-firebase-model';
import { firestore } from 'firebase';

export interface BaseAccount extends BaseFirebaseModel {
    accountId?: number;
    login?: String;
    password?: String;
    birthDate?: firestore.Timestamp;
    region: Region;
}
