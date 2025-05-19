import path from 'path';
import {PathSplitResult} from './pathSplitResult';

export class PathSpliter {
    private _path: string;

    constructor(path : string) {
        this._path = path;
    }

    resolvePath(): PathSplitResult {
        const itemName = path.basename(this._path);
        const parentItemName = path.basename(itemName);
        return {itemName, parentItemName};
    }
}