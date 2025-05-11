import {ResourceItem} from './resourceItem';
import {PathSpliter} from '../PathSplit/pathSpliter';
import {IModifierResource} from './ImodifierResource';

export class FileItem implements IModifierResource {
    private _fileName: string;
    private _directoryName: string;
    private _resource: ResourceItem; // модель с терминальным объектом системы

    constructor (path: string) {
        this._resource = new ResourceItem(path);
        const splitedPath = new PathSpliter(path).resolvePath();
        this._fileName = splitedPath.ItemName;
        this._directoryName = splitedPath.ParentItemName;
    }

    set directoryName(directoryName : string) {
        this._directoryName = directoryName;
    }

    create () : boolean {
        return this._resource.createFile();
    }

    delete () : boolean {
        return this._resource.deleteFile();
    }

    rename(newName : string) : boolean {
        const result = (this._directoryName !== newName) && this._resource.rename(newName);
        if (result) this._fileName = newName;
        return result;
    }
}