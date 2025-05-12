import {DirectoryItem} from '../Entities/FileSystemItems/directoryItem';
import {FileItem} from '../Entities/FileSystemItems/fileItem';

export function createFile(filePath): boolean {
    return new FileItem(filePath).create();
}

export function deleteFile(filePath: string): boolean {
    return new FileItem(filePath).delete();
}

export function renameFile(filePath: string, newName: string): boolean {
    return new FileItem(filePath).rename(newName);
}

export function createDirectory(directoryPath: string): boolean {
    return new DirectoryItem(directoryPath).create();
}

export function deleteDirectory(directoryPath: string): boolean {
    return new DirectoryItem(directoryPath).delete();
}

export function renameDirectory(directoryPath: string, newName: string): boolean {
    return new DirectoryItem(directoryPath).rename(newName);
}