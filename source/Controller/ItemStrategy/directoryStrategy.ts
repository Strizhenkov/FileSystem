import {DirectoryItem} from "../../Entities/FileSystemItems/directoryItem";
import {IResourceStrategy} from "./IResourceStrategy";

export class DirectoryStrategy implements IResourceStrategy{
    private item: DirectoryItem;

    constructor(path: string) {
        this.item = new DirectoryItem(path);
    }

    create(): boolean {
        return this.item.create();
    }

    delete(): boolean {
        return this.item.delete();
    }

    rename(newName: string): boolean {
        return this.item.rename(newName);
    }

    getData(): string[] {
        return this.item.getData();
    }
}