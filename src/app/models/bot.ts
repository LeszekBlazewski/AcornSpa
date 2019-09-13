import { BotOrder } from '../enums/bot-order.enum';
import { BaseFirebaseModel } from './base-firebase-model';

export interface Bot extends BaseFirebaseModel {
    botId: number,
    botOrder: BotOrder
}