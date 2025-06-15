import { ResourceType } from '../commandOperator';
import {DbAdapter} from './dbAdapter';

export type logRow = {
    id : number;
    objectName : string;
    objectType : string;
    actionType : string;
    username : string;
}

export class DbLogsAdapter extends DbAdapter {
    async postLog(objectName: string, objectType: ResourceType, actionType: string, username: string): Promise<void> {
        if (this.isOpened()) {
            const stmt = await this.db.prepare(`INSERT INTO logs (objectName, objectType, actionType, username) VALUES (?, ?, ?, ?)`);
            await stmt.run(objectName, objectType, actionType, username);
            await stmt.finalize();
        }
    }

    async getAllLogs(): Promise<logRow[]> {
        if(this.isOpened()) {
            const result = await this.db.all(`SELECT * FROM logs`);
            return result;
        }
    }
}