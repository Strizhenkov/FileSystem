const fs = require('fs');
const path = require('path');

function showDirectory(dirPath) {
    const dir = path.resolve(dirPath);
    
    if (!fs.existsSync(dir)) {
        return `Папка ${dir} не найдена`;
    }

    const data = fs.readdirSync(dir);
    let output = `Содержимое директории:\n┍${dir}\n`;

    data.forEach(item => {
        const itemPath = path.join(dir, item);
        const itemStat = fs.statSync(itemPath);
        const itemType = itemStat.isFile() ? 'File' : 'Directory';
        output += `├-${item} (${itemType})\n`;
    });

    return output;
}

function createFile(filePath) {
    const fullPath = path.resolve(filePath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
        return `Папка ${dir} не найдена`;
    }

    if (fs.existsSync(fullPath)) {
        return `Файл ${fullPath} уже существует`;
    }

    try {
        fs.writeFileSync(fullPath, '');
        return `Файл ${fullPath} создан`; 
    } catch (err) {
        return `Ошибка при создании файла ${err.message}`;
    }
}

function deleteFile(filePath) {
    const fullPath = path.resolve(filePath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
        return `Папка ${dir} не найдена`;
    }

    if (!fs.existsSync(fullPath)) {
        return `Файл ${fullPath} не найден`;
    }

    try {
        fs.unlinkSync(fullPath);
        return `Файл ${fullPath} удалён`;
    } catch (err) {
        return `Ошибка при удалении файла ${err.message}`;
    }
}

function renameFile(filePath, newName) {
    const fullPath = path.resolve(filePath);
    const dir = path.dirname(fullPath);
    const fullNewPath = path.join(dir, newName);

    if (!fs.existsSync(fullPath)) {
        return `Файл ${fullPath} не найден`;
    }

    if (fs.existsSync(fullNewPath)) {
        return `Файл ${fullNewPath} уже существует`;
    }

    try {
        fs.renameSync(fullPath, fullNewPath);
        return `Файл ${fullPath} переименован в ${fullNewPath}`;
    } catch (err) {
        return `Ошибка при переименовании файла ${err.message}`;
    }
}

function createDirectory(dirPath) {
    const dir = path.resolve(dirPath);

    if (fs.existsSync(dir)) {
        return `Папка ${dir} уже существует`;
    }

    try {
        fs.mkdirSync(dir, { recursive: true });
        return `Папка ${dir} создана`;
    } catch (err) {
        return `Ошибка при создании папки ${err.message}`;
    }
}

function deleteDirectory(dirPath) {
    const dir = path.resolve(dirPath);

    if (!fs.existsSync(dir)) {
        return `Папка ${dir} не найдена`;
    }

    try {
        fs.rmSync(dir, { recursive: true, force: true });
        return `Папка ${dir} удалена`;
    } catch(err) {
        return `Ошибка при удалении папки ${dir}`;
    }

}

function renameDirectory(dirPath, newName) {
    const dir = path.resolve(dirPath);
    const perentDir = path.dirname(dirPath);
    const newDir = path.join(perentDir, newName);

    if (!fs.existsSync(dir)) {
        return `Папка ${dir} не найдена`;
    }

    if (fs.existsSync(newDir)) {
        return `Папка ${newDir} уже существует`;
    }

    try {
        fs.renameSync(dir, newDir);
        return `Папка ${dir} переименована в ${newDir}`;
    } catch (err) {
        return `Ошибка при переименовании папки ${dir}`;
    }
}

module.exports = { showDirectory, createFile, deleteFile, renameFile, createDirectory, deleteDirectory, renameDirectory };