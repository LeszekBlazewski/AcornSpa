import { Region } from '../enums/region.enum';

export interface BaseAccount {
    accountId?: number;
    login?: String;
    password?: String;
    birthDate?: Date;
    region: Region;
}
