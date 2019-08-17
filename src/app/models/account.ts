import { BaseAccount } from './baseAccount';

export interface BotAccount extends BaseAccount {
    botId: Number;
    level: Number;
    expPercentage: Number;
}