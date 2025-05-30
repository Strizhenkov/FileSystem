import {AuthFeedBack} from "./Helpers/authFeedBack";
import {hashString} from "./Helpers/hashFunction";
import {User} from "../../Model/User";
//import Database from "better-sqlite3";

import sqlite3 from 'sqlite';

class DbStorage {
    #_pathToDb = '';
    #_db: sqlite3.Database = null;

    init (pathToDb: string) {
        this.#_pathToDb = pathToDb;
    }

    openDb = async (afterOpen:(storage: DbStorage) => void ) => {
        this.#_db = await sqlite3.open({
            filename: this.#_pathToDb,
            driver: sqlite3.Database
        });
        afterOpen(this);
    }

    isOpened = () => {
        return this.#_db != null;
    }

    closeDb = async (afterClose:() => void ) => {
        if (this.#_db != null) {
            await this.#_db.close()
            this.#_db = null;
        }
        afterClose();
    }

    createRow = async () => {

    }

    removeRow = async () => {
        
    }

    updateRow = async () => {

    }

    getRow = async () => {

    }

    getAccessLevelUser = async (user:User) : enumAccessType => {
        if (this.isOpened()) {
            const stmt = await this.#_db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
            const result = stmt.get(user.getHashName());
            if (!result) {
                return 'unknown';
            }
            else 
            {
                return result.accessLevel;
            }
        }
    }
}


const PATH_TO_DB = 'source/Model/User.db';
export class AuthService {
    #_dbStorage: DbStorage = null;

    private handleOpenDb = (dbStorage: DbStorage) => {

    }

    init () {
        this.#_dbStorage = new DbStorage();
        this.#_dbStorage.init(PATH_TO_DB);
        this.#_dbStorage.openDb(this.handleOpenDb);
    }

    private findUser(username: string, password: string) : User | null {

        const db = new Database('source/Model/User.db');
        const stmt = db.prepare('SELECTS * FROM users WHERE username = ? AND password = ?');
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