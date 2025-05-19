import {ResourceItem} from './resourceItem';
import {PathSpliter} from '../Helpers/pathSpliter';
import {IModifierResource} from './iModifierResource';

export class FileItem implements IModifierResource {
    private _fileName: string;
    private _directoryName: string;
    private _resource: ResourceItem; // модель с терминальным объектом системы

    constructor (path: string) {
        this._resource = new ResourceItem(path);
        const splitedPath = new PathSpliter(path).resolvePath();
        this._fileName = splitedPath.itemName;
        this._directoryName = splitedPath.parentItemName;
    }

    set parentDirectoryName(directoryName : string) {
        this._directoryName = directoryName;
    }

    get parentFolderName(): string {
        return this._directoryName;
    }

    get itemName(): string {
        return this._fileName;
    }

    create () : boolean {
        return this._resource.createFile();
    }

    delete () : boolean {
        return this._resource.deleteFile();
    }

    rename(newName : string) : boolean {
        const result = (this._fileName !== newName) && this._resource.rename(newName);
        if (result) this._fileName = newName;
        return result;
    }
}