import fs from 'fs';
import path from 'path';
import {AccessLevel} from './accessLevel';

export interface IResourceItem {
    path: string;
    isExists: () => boolean;    
}

export class ResourceItem implements IResourceItem {
    private _path : string;
    private _accessLevel: AccessLevel;

    constructor (path: string) {
        this._path = path;
        this._accessLevel = AccessLevel.NotAuthorized;
    }

    get path() {
        return this._path;
    }

    private tryAction(action: () => void): boolean {
        try {
            action();
            return true;
        } catch {
            return false;
        }
    }

    createFile(): boolean {
        if (this.isExists()) return false;
        return this.tryAction(() => fs.writeFileSync(this._path, ''));
    }

    deleteFile(): boolean {
        if (!this.isExists()) return false;
        return this.tryAction(() => fs.unlinkSync(this._path));
    }

    createDirectory(): boolean {
        if (this.isExists()) return false;
        return this.tryAction(() => fs.mkdirSync(this._path));
    }

    deleteDirectory(): boolean {
        if (!this.isExists()) return false;
        return this.tryAction(() => fs.rmdirSync(this._path));
    }

    rename(newName: string): boolean {
        if (!this.isExists()) return false;
        const newPath = path.join(path.dirname(this._path), newName);
        return this.tryAction(() => {fs.renameSync(this._path, newPath); this._path = newName;});
    }

    isExists () : boolean {
        return fs.existsSync(this._path);
    }

    checkRight (currentAccessLevel: AccessLevel) : boolean {
        return currentAccessLevel >= this._accessLevel;
    }
}