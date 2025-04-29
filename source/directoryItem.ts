import {ResourceItem, IModifierResourceWithRights} from './ResourceItem';
import {FileItem} from './FileItem'

export class DirectoryItem implements IModifierResourceWithRights {
    private _resource: ResourceItem // модель с терминальным объектом системы
    private _files: FileItem[]
    private _directories

    constructor (path: string) {
        this._resource = new ResourceItem(path);
    }
    
    create () : boolean {

        return true;
    }

    delete () : boolean {

        return true;
    }
    
    checkRight () : boolean {

        return true;
    }
}