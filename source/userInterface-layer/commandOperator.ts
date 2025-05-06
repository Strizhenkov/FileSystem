const path = require('path');
const { FileItem } = require('../entities/fileItem');

function createFile(filePath) {
    const file = new FileItem(path.basename(filePath));
    file.setFolder(path.dirname(filePath));
    return file.create();
}

module.exports = {
    createFile
};