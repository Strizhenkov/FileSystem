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

    private tryAction(condition: boolean, action: () => void): boolean {
        if (!condition) return false;
        try {
            action();
            return true;
        } catch {
            return false;
        }
    }

    createFile(): boolean {
        return this.tryAction(!this.isExists(), () => fs.writeFileSync(this._path, ''));
    }

    deleteFile(): boolean {
        return this.tryAction(this.isExists(), () => fs.unlinkSync(this._path));
    }

    createDirectory(): boolean {
        return this.tryAction(!this.isExists(), () => fs.mkdirSync(this._path));
    }

    deleteDirectory(): boolean {
        return this.tryAction(this.isExists(), () => fs.rmSync(this._path, {recursive: true, force: true}));
    }

    rename(newName: string): boolean {
        const newPath = path.join(path.dirname(this._path), newName);
        return this.tryAction(this.isExists(), () => {fs.renameSync(this._path, newPath); this._path = newPath;});
    }

    getDirectoryData(): string[] {
        return this.tryAction(this.isExists(), () => fs.readdirSync(this._path)) ? fs.readdirSync(this._path) : [];
    }

    fullSubPath(name: string): string {
        return path.join(this._path, name);
    }

    isDirectory(): boolean {
        return this.tryAction(true, () => fs.statSync(this._path).isDirectory());
    }

    isExists () : boolean {
        return fs.existsSync(this._path);
    }

    checkRight (currentAccessLevel: AccessLevel) : boolean {
        return currentAccessLevel >= this._accessLevel;
    }
}