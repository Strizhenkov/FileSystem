import {AccessLevel} from '../../Entities/FileSystemItems/accessLevel';
import {DbAdapter} from './bdAdapter';

export class DbAccessAdapter extends DbAdapter {
    getAccessLevelUser = async (objectName: string) : Promise<AccessLevel>  => {
        if (this.isOpened()) {
            const stmt = await this.db.prepare('SELECT * FROM access WHERE objectName = ?');
            const result = await stmt.get(objectName);
            await stmt.finalize();
            if (!result) return AccessLevel.Admin;
            return result.accessLevel;
        }
    }
}