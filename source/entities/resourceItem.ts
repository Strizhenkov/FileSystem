import fs from 'fs';
import path from 'path';
import {AccessLevel} from './directoryItem';

export interface IResourceItem {
    path: string;
    isExists: () => boolean;    
}

export class ResourceItem implements IResourceItem {
    private _path : string;
    private _resources: IResourceItem[];

    get path() {
        return this._path;
    }

    isExists () : boolean {
        return fs.existsSync(this._path);
    }

    constructor (path: string) {
        this._path = path;
    }

    rename(newName : string) : boolean {
        try {
            fs.renameSync(this._path, path.join(path.dirname(this._path), newName))
            return true;
        } catch {
            return false;
        }
    }
}

export interface IModifierResource {
    create: () => boolean;
    delete: () => boolean;
}

export interface IModifierResourceWithRights extends IModifierResource {
    checkRight: (currentAccessLevel: AccessLevel) => boolean;
}