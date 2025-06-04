import sqlite3 from 'sqlite3';
import {open, Database} from 'sqlite';

export abstract class DbAdapter {
    protected pathToDb = '';
    protected db: Database = null;

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
}