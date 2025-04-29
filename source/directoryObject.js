import { BaseObject } from "./baseObject";

const fs = require("fs");
const path = require("path");

class DirectoryObject extends BaseObject {
    show() {
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

    create() {
        fs.mkdirSync(this.fullPath, { recursive : true });
    }

    delete() {
        fs.rmSync(this.fullPath, { recursive : true, force : true });
    }
}

export {
    DirectoryObject
};