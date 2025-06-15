import {AccessLevel} from "../../Entities/FileSystemItems/accessLevel";
import {DbAdapter} from './dbAdapter';

export class DbAuthAdapter extends DbAdapter {
    getAccessLevelUser = async (username: string, password: string) : Promise<AccessLevel>  => {
        if (this.isOpened()) {
            const stmt = await this.db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
            const data = await stmt.get(username, password);
            await stmt.finalize();
            const level = data ? data.accessLevel : AccessLevel.NotAuthorized;
            return level;
        }
    }
}