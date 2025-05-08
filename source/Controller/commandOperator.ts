import path from 'path'
import {FileItem} from '../Entities/fileItem';

function basicSetUpFile(filePath: string) {
    const file = new FileItem(path.basename(filePath));
    file.setFolder(path.dirname(filePath));
    return file;
}

export function createFile(filePath) {
    return basicSetUpFile(filePath).create();
}

export function deleteFile(filePath: string): boolean {
    return basicSetUpFile(filePath).delete();
}

export function renameFile(filePath: string, newName: string): boolean {
    return basicSetUpFile(filePath).rename(newName);
}

module.exports = {createFile, deleteFile, renameFile};