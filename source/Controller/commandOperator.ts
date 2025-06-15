import {AccessLevel} from '../Entities/FileSystemItems/accessLevel';
import {DbAccessAdapter} from './DbAdapters/dbAccessAdapter';
import {DbLogsAdapter} from './DbAdapters/dbLogsAdapter';
import {DirectoryStrategy} from './ItemStrategy/directoryStrategy';
import {FileStrategy} from './ItemStrategy/fileStrategy';
import {IResourceStrategy} from './ItemStrategy/iResourceStrategy';

export enum ResourceType {
    FILE = 'file',
    DIRECTORY = 'directory',
}

const PATH_TO_ACCESS_DB = 'source/Model/Access.db';
const PATH_TO_LOGS_DB = 'source/Model/Logs.db';

export class CommandOperator {
    private strategy: IResourceStrategy;
    private dbStorage: DbAccessAdapter = null;
    private dbLogs: DbLogsAdapter = null;
    private access: AccessLevel;
    private objPath : string;
    private objType : ResourceType;
    private username : string;

    constructor(type: ResourceType, path: string, access: AccessLevel, username: string) {
        this.strategy = this.setStrategy(type, path);
        this.objType = type;
        this.objPath = path;
        this.access = access;
        this.username = username;
    }

    private setStrategy(type : ResourceType, path : string) : IResourceStrategy {
        switch(type) {
            case ResourceType.FILE:
                return new FileStrategy(path);
            case ResourceType.DIRECTORY:
                return new DirectoryStrategy(path);
            default:
                throw new Error(`Wrong type: ${type}`);
        }
    }

    async initAccess() {
        this.dbStorage = new DbAccessAdapter();
        this.dbStorage.init(PATH_TO_ACCESS_DB);
        await this.dbStorage.openDb(() => {});
    }

    async initLogs() {
        this.dbLogs = new DbLogsAdapter();
        this.dbLogs.init(PATH_TO_LOGS_DB);
        await this.dbLogs.openDb(() => {});
    }

    private async check() : Promise<boolean> {
        return this.access >= await this.dbStorage.getAccessLevel(this.objPath);
    }

    async create(): Promise<boolean> {
        if (await this.check()) {
            const status = this.strategy.create();
            if (status) {
                this.dbLogs.postLog(this.objPath, this.objType, 'create', this.username);
            }
            return status;
        }
        return false;
    }

    async delete(): Promise<boolean> {
        if (await this.check()) {
            const status = this.strategy.delete();
            if (status) {
                this.dbLogs.postLog(this.objPath, this.objType, 'delete', this.username);
            }
            return status;
        }
        return false;
    }

    async rename(newName : string): Promise<boolean> {
        if (await this.check()) {
            const status = this.strategy.rename(newName);
            if (status) {
                this.dbLogs.postLog(this.objPath, this.objType, 'rename', this.username);
            }
            return status;
        }
        return false;
    }

    async getData(): Promise<string[]> {
        if (await this.check()) {
            const status = (this.strategy as DirectoryStrategy).getData();
            if (status) {
                this.dbLogs.postLog(this.objPath, this.objType, 'get', this.username);
            }
            return status;
        }
        return [];
    }
}