import { Region } from '../enums/region.enum';
import { BaseFirebaseModel } from './base-firebase-model';

export interface BaseAccount extends BaseFirebaseModel {
    accountId?: number;
    login?: String;
    password?: String;
    birthDate?: Date;
    region: Region;
}
