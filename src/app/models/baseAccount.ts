import { Region } from '../enums/region.enum';

export interface BaseAccount {
    accountId?: Number;
    login?: String;
    password?: String;
    birthDate?: Date;
    region: Region;
}
