import {ResourceItem, IModifierResourceWithRights} from './resourceItem';
import {FileItem} from './fileItem';
import fs from 'fs';

export enum AccessLevel {
    NotAuthorized = 0,
    User = 1,
    Admin = 2,
}

export class DirectoryItem implements IModifierResourceWithRights {
    private _dirName: string;
    private _resource: ResourceItem; // модель с терминальным объектом системы
    private _files: FileItem[];
    private _directories: DirectoryItem[];
    private _accessLevel: AccessLevel;

    constructor (path: string) {
        this._resource = new ResourceItem(path);
        this._accessLevel = AccessLevel.NotAuthorized;
    }
    
    create () : boolean {
        try {
            fs.mkdirSync(this._resource.path);
            return true;
        } catch {
            return false;
        }
    }

    delete () : boolean {
        try {
            for (let file of this._files) {
                file.delete();
            }
            for (let dir of this._directories) {
                dir.delete();
            }
            fs.rmdirSync(this._resource.path);
            return true;
        } catch {
            return false;
        }
    }

    rename(newName: string): boolean {
        if (this._dirName !== newName) return this._resource.rename(newName);
        return false;
    }
    
    checkRight (currentAccessLevel: AccessLevel) : boolean {
        return currentAccessLevel >= this._accessLevel;
    }
}