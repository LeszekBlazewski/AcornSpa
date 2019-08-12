import { Region } from '../enums/region.enum';

export interface Account {
    accountId?: Number;
    botId: Number;
    login?: String;
    password?: String;
    birthDate?: Date;
    region: Region;
    level: Number;
    expPercentage: Number;
}