import {AccessLevel} from "../../Entities/FileSystemItems/accessLevel";
import {DbAdapter} from './bdAdapter';

export class DbAuthAdapter extends DbAdapter {
    getAccessLevelUser = async (username: string, password: string) : Promise<AccessLevel>  => {
        if (this.isOpened()) {
            const stmt = await this.db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
            const result = await stmt.get(username, password);
            await stmt.finalize();
            if (!result) return AccessLevel.NotAuthorized;
            return result.accessLevel;
        }
    }
}