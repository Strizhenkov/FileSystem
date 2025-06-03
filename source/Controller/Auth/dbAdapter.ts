import sqlite3 from 'sqlite3';
import {open, Database} from 'sqlite';
import {AccessLevel} from "../../Entities/FileSystemItems/accessLevel";

export class DbAdapter {
    private pathToDb = '';
    private db: Database = null;

    init (pathToDb: string) {
        this.pathToDb = pathToDb;
    }

    async openDb(afterOpen: (storage: DbAdapter) => void) {
        this.db = await open({
            filename: this.pathToDb,
            driver: sqlite3.Database
        });
        afterOpen(this);
    }

    isOpened = () => {
        return this.db != null;
    }

    closeDb = async (afterClose:() => void ) => {
        if (this.db != null) {
            await this.db.close()
            this.db = null;
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