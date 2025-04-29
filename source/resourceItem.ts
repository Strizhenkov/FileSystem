import fs from 'fs';

export interface IResourceItem {
    path: string
    isExists: () => boolean    
}

export class ResourceItem implements IResourceItem {
    private _path : string
    private _resources: IResourceItem[]

    get path() {
        return this._path;
    }

    isExists () : boolean {
        return fs.existsSync(this._path);
    }

    constructor (path: string) {
        this._path = path;

    }
}

export interface IModifierResource {
    create: () => boolean
    delete: () => boolean
}

export interface IModifierResourceWithRights extends IModifierResource {
    checkRight: () => boolean
}