import {AccessLevel} from '../../Entities/FileSystemItems/accessLevel';
import {DbAdapter} from './dbAdapter';

export class DbAccessAdapter extends DbAdapter {
    getAccessLevel = async (objectName: string) : Promise<AccessLevel>  => {
        if (this.isOpened()) {
            const stmt = await this.db.prepare('SELECT * FROM access WHERE objectName = ?');
            const data = await stmt.get(objectName);
            await stmt.finalize();
            const level = data ? data.accessLevel : AccessLevel.Admin;
            return level;
        }
    }
}