import { BaseFirebaseModel } from './base-firebase-model';

export interface Log extends BaseFirebaseModel {
    botId?: number;
    status: string;
    date?: Date;
}