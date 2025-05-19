import {FileItem} from "../../Entities/FileSystemItems/fileItem";
import {IResourceStrategy} from "./IResourceStrategy";

export class FileStrategy implements IResourceStrategy {
    private item: FileItem;

    constructor(path: string) {
        this.item = new FileItem(path);
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
}