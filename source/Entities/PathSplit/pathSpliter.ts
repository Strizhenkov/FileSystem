import path from 'path';
import {PathSplitResult} from './pathSplitResult';

export class PathSpliter {
    private _path: string;

    constructor(path : string) {
        this._path = path;
    }

    resolvePath() {
        const itemName = path.basename(this._path);
        const parentItemName = path.basename(itemName);
        return new PathSplitResult(itemName, parentItemName);
    }
}