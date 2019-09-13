import { QueueType } from '../enums/queue-type.enum';
import { AiConfig } from '../enums/ai-config.enum';
import { BaseFirebaseModel } from './base-firebase-model';

export interface Config extends BaseFirebaseModel {
    botId: number;
    queueType: QueueType;
    aiConfig: AiConfig;
    path: string;
    overwriteConfig: boolean;
    closeBrowser: boolean;
    noActionTimeout: number;
}