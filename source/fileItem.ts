import {ResourceItem, IModifierResource} from './ResourceItem';
import {DirectoryItem} from './DirectoryItem';

export class FileItem implements IModifierResource {
    private _filename: string
    private _resource: ResourceItem // модель с терминальным объектом системы
    private _directoryItem: DirectoryItem

    constructor (filename: string) {
        this._filename = filename;
    }

    setFolder (path: string) {
        this._resource = new ResourceItem(path);
    }

    create () : boolean {

        return true;
    }

    delete () : boolean {

        return true;
    }
}