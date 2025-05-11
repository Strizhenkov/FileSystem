export class PathSplitResult {
    private _itemName: string;
    private _parentItemName : string;

    constructor (itemName : string, parentItemName : string) {
        this._itemName = itemName;
        this._parentItemName = parentItemName;
    }

    get ItemName() : string {
        return this._itemName;
    }

    get ParentItemName() : string {
        return this._parentItemName;
    }
}