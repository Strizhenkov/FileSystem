import {FileItem} from '../Entities/FileSystemItems/fileItem';

export function createFile(filePath) {
    return new FileItem(filePath).create();
}

export function deleteFile(filePath: string): boolean {
    return new FileItem(filePath).delete();
}

export function renameFile(filePath: string, newName: string): boolean {
    return new FileItem(filePath).rename(newName);
}

module.exports = {createFile, deleteFile, renameFile};