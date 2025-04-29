import { BaseObject } from "./baseObject";

const fs = require("fs");
const path = require("path");

class FileObject extends BaseObject {
    show() {
        
    }

    create() {
        fs.writeFileSync(this.fullPath, '');
    }

    delete() {
        fs.unlinkSync(this.fullPath);
    }
}

export {
    FileObject
};