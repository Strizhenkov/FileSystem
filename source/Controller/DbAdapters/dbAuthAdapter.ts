import {AccessLevel} from "../../Entities/FileSystemItems/accessLevel";
import {DbAdapter} from './bdAdapter';

export class DbAuthAdapter extends DbAdapter {
    getAccessLevelUser = async (username: string, password: string) : Promise<AccessLevel>  => {
        if (this.isOpened()) {
            const stmt = await this.db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
            const result = await stmt.get(username, password);
            await stmt.finalize();
            const level = result ? result.accessLevel : AccessLevel.NotAuthorized;
            return level;
        }
    }
}