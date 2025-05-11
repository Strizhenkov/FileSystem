import {ResourceItem} from './resourceItem';
import {FileItem} from './fileItem';
import {PathSpliter} from '../PathSplit/pathSpliter';
import {IModifierResource} from './ImodifierResource';

export class DirectoryItem implements IModifierResource {
    private _directoryName: string;
    private _parentDirectoryName: string;
    private _resource: ResourceItem; // модель с терминальным объектом системы
    private _files: FileItem[];
    private _directories: DirectoryItem[];

    constructor (path: string) {
        this._resource = new ResourceItem(path);
        const splitedPath = new PathSpliter(path).resolvePath();
        this._directoryName = splitedPath.ItemName;
        this._parentDirectoryName = splitedPath.ParentItemName;
        this._files = [];
        this._directories = [];
    }
    
    set parentDirectoryName(parentDirectoryName : string){
        this._parentDirectoryName = parentDirectoryName;
    }

    create () : boolean {
        return this._resource.createDirectory();
    }

    delete () : boolean {
        try {
            for (let file of this._files) {
                file.delete();
            }
            for (let dir of this._directories) {
                dir.delete();
            }
            this._resource.deleteDirectory();
            return true;
        } catch {
            return false;
        }
    }

    rename(newName: string): boolean {
        const result = (this._directoryName !== newName) && this._resource.rename(newName);
        if (!result) return false;
        this._directoryName = newName;
        for (let file of this._files) {
            file.directoryName = newName;
        }
        for (let directory of this._directories) {
            directory.parentDirectoryName = newName;
        }
        return true;
    }
}