import {ResourceItem} from './resourceItem';
import {FileItem} from './fileItem';
import {PathSpliter} from '../PathSplit/pathSpliter';
import {IModifierResource} from './iModifierResource';

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
        this.updateDirectoryData();
    }
    
    set parentDirectoryName(parentDirectoryName : string){
        this._parentDirectoryName = parentDirectoryName;
    }

    get itemName(): string {
        return this._directoryName;
    }

    get parentFolderName(): string {
        return this._parentDirectoryName;
    }

    private updateDirectoryData() {
        const files: FileItem[] = [];
        const directories: DirectoryItem[] = [];
        const items = this._resource.getDirectoryData();

        for (let itemName of items) {
            const fullItemPath = this._resource.fullSubPath(itemName);
            const subResource = new ResourceItem(fullItemPath);
            
            if (!subResource.isExists()) continue;

            if (subResource.isDirectory())
                directories.push(new DirectoryItem(fullItemPath));
            else
                files.push(new FileItem(fullItemPath));
        }

        this._files = files;
        this._directories = directories;
    }

    create () : boolean {
        return this._resource.createDirectory();
    }

    delete () : boolean {
        const result = this._resource.deleteDirectory();
        if (!result) return false;

        for (let file of this._files) {
            file.delete();
        }
        for (let dir of this._directories) {
            dir.delete();
        }
        return true;
    }

    rename(newName: string): boolean {
        if (this._directoryName === newName) return false;
        const result = this._resource.rename(newName);
        if (!result) return false;

        this._directoryName = newName;
        for (let file of this._files) {
            file.parentDirectoryName = newName;
        }
        for (let directory of this._directories) {
            directory.parentDirectoryName = newName;
        
        }
        return true;
    }

    getData(): string[] {
        const data: string[] = [];

        for (let file of this._files) {
            data.push(file.itemName);
        }
        for (let dir of this._directories) {
            data.push(dir.itemName);
        }

        return data.sort();
    }
}