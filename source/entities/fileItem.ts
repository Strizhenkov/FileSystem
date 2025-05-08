import fs from 'fs';
import {IModifierResource, ResourceItem} from './resourceItem';
import {DirectoryItem} from './directoryItem';

export class FileItem implements IModifierResource {
    private _fileName: string;
    private _resource: ResourceItem; // модель с терминальным объектом системы
    private _directoryItem: DirectoryItem;

    constructor (filename: string) {
        this._fileName = filename;
    }

    setFolder (path: string) {
        this._resource = new ResourceItem(path);
    }

    create () : boolean {
        try {
            fs.writeFileSync(this._resource.path + '\\' + this._fileName, '');
            return true;
        } catch {
            return false;
        }
    }

    delete () : boolean {
        try {
            fs.unlinkSync(this._resource.path + '\\' + this._fileName);
            return true;
        } catch {
            return false;
        }
    }

    rename(newName : string) : boolean {
        if (this._fileName !== newName) return this._resource.rename(newName);
        return false;
    }
}