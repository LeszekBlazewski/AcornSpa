import { BotOrder } from '../enums/bot-order.enum';

export interface Bot {
    botId: number,
    botOrder: BotOrder
}