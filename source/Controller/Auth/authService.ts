import {AuthFeedBack} from "./Helpers/authHelpers";
import {hashString} from "./Helpers/authHelpers";
import {User} from "../../Model/User";
import {DbAuthAdapter} from "../DbAdapters/dbAuthAdapter";
import {PATH_TO_DB} from "../../Model/DbPath";

export class AuthService {
    dbStorage: DbAuthAdapter = null;

    private async init() {
        this.dbStorage = new DbAuthAdapter();
        this.dbStorage.init(PATH_TO_DB);
        await this.dbStorage.openDb(() => {});
    }

    private async findUser(username: string, password: string) : Promise<User> {
        const data = await this.dbStorage.getAccessLevelUser(username, password);
        const user = data ? new User(username, password, data) : null;
        return user;
    }

    async auth(username : string, password : string) : Promise<AuthFeedBack> {
        await this.init();
        const authUser = await this.findUser(hashString(username), hashString(password));
        const result = authUser != null 
            ? { status: true, access: authUser.getAccessLevel() } 
            : { status: false, access: 0 };
        await this.dbStorage.closeDb(() => {});
        return result;
    }
}