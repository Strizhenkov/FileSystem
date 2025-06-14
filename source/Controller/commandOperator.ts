import {AccessLevel} from '../Entities/FileSystemItems/accessLevel';
import {DbAccessAdapter} from './DbAdapters/dbAccessAdapter';
import {DirectoryStrategy} from './ItemStrategy/directoryStrategy';
import {FileStrategy} from './ItemStrategy/fileStrategy';
import {IResourceStrategy} from './ItemStrategy/iResourceStrategy';

export enum ResourceType {
    FILE = 'file',
    DIRECTORY = 'directory',
}

const PATH_TO_DB = 'source/Model/Access.db';

export class CommandOperator {
    private strategy: IResourceStrategy;
    private dbStorage: DbAccessAdapter = null;
    private access: AccessLevel;
    private objPath : string;

    constructor(type: ResourceType, path: string, access: AccessLevel) {
        this.strategy = this.setStrategy(type, path);
        this.objPath = path;
        this.access = access;
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