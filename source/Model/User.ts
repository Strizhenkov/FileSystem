import {hashString} from "../Controller/Auth/Helpers/authHelpers";
import {AccessLevel} from "../Entities/FileSystemItems/accessLevel";

export class User {
    username: string;
    password: string;
    accessLevel: AccessLevel;

    constructor(username: string, password: string, accessLevel: AccessLevel) {
        this.username = username;
        this.password = password;
        this.accessLevel = accessLevel;
    }

    getHashedName() : string {
        return hashString(this.username)
    }

    getHashedPassword() : string {
        return hashString(this.password)
    }

    getAccessLevel() : AccessLevel {
        return this.accessLevel;
    }
}