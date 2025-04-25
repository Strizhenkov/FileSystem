const path = require("path");
const { deleteFile } = require(".");

class FileInSystem {
    #fileName;
    #path;
    #fullFilename;

    constructor(fileName, path) {
        this.#fileName = fileName;
        this.#path = path;
        this.#fullFilename = path.join(this.#path, this.#fileName);
    }

    createFile() {
        
    }

    deleteFile() {

    }
}

export {
    FileInSystem
};