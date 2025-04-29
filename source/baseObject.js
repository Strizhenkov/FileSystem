const fs = require("fs");
const path = require("path");

class BaseObject {
    constructor(fullPath) {
        this.fullPath = fullPath;
        this.name = path.basename(this.fullPath);
        this.parentDirectory = path.dirname(this.fullPath);
    }
    show() {
        throw new Error("Base class");
    }

    create() {
        throw new Error("Base class");
    }

    delete() {
        throw new Error("Base class");
    }
}

export {
    BaseObject
};