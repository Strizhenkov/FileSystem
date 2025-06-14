import {AccessLevel} from '../Entities/FileSystemItems/accessLevel';
import {DbAccessAdapter} from './DbAdapters/dbAccessAdapter';
import {DirectoryStrategy} from './ItemStrategy/directoryStrategy';
import {FileStrategy} from './ItemStrategy/fileStrategy';
import {IResourceStrategy} from './ItemStrategy/iResourceStrategy';

const PATH_TO_DB = 'source/Model/Access.db';

export class CommandOperator {
    private strategy: IResourceStrategy;
    private dbStorage: DbAccessAdapter = null;
    private access: AccessLevel;
    private objPath : string;

    constructor(type: 'file' | 'directory', path: string, access : AccessLevel) {
        if (type === 'file') {
            this.strategy = new FileStrategy(path);
        } else {
            this.strategy = new DirectoryStrategy(path)
        }
        this.objPath = path;
        this.access = access;
    }

    async init() {
        this.dbStorage = new DbAccessAdapter();
        this.dbStorage.init(PATH_TO_DB);
        await this.dbStorage.openDb(() => {});
    }

    private async check() : Promise<boolean> {
        return this.access >= await this.dbStorage.getAccessLevelUser(this.objPath);
    }

    async create(): Promise<boolean> {
        return await this.check() ? this.strategy.create() : false;
    }

    async delete(): Promise<boolean> {
        return await this.check() ? this.strategy.delete() : false;
    }

    async rename(newName : string): Promise<boolean> {
        return await this.check() ? this.strategy.rename(newName) : false;
    }

    async getData(): Promise<string[]> {
        return await this.check() ? (this.strategy as DirectoryStrategy).getData() : [];
    }
}