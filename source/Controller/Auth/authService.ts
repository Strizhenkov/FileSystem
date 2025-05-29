import {AuthFeedBack} from "./Helpers/authFeedBack";
import {hashString} from "./Helpers/hashFunction";
import {User} from "../../Model/User";
import Database from "better-sqlite3";

export class AuthService {
    private findUser(username: string, password: string) : User | null {
        const db = new Database('source/Model/User.db');
        const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
        const result = stmt.get(username, password);
        if (!result) return null;
        return new User(result.username, result.password, result.accessLevel);
    }

    auth(username : string, password : string) : AuthFeedBack {
        const hashedUsername = hashString(username);
        const hashedPassword = hashString(password);
        const authUser = this.findUser(hashedUsername, hashedPassword)
        if (authUser != null)
            return {status: true, access: authUser.getAccessLevel()};
        return {status: false, access : 0};
    }
}