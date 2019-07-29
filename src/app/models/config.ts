import { QueueType } from '../enums/queue-type.enum';
import { AiConfig } from '../enums/ai-config.enum';

export interface Config {
    botId: number;
    queueType: QueueType;
    aiConfig: AiConfig;
    path: string;
    overwriteConfig: boolean;
    closeBrowser: boolean;
    noActionTimeout: number;
}