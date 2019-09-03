import { BaseAccount } from './baseAccount';

export interface BotAccount extends BaseAccount {
    botId: number;
    level: number;
    expPercentage: number;
}