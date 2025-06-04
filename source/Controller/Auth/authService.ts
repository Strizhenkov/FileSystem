import {AuthFeedBack} from "./Helpers/authFeedBack";
import {hashString} from "./Helpers/hashFunction";
import {User} from "../../Model/User";
import {DbAuthAdapter} from "../DbAdapters/dbAuthAdapter";

const PATH_TO_DB = 'source/Model/User.db';

export class AuthService {
    dbStorage: DbAuthAdapter = null;

    private handleOpenDb = (dbStorage: DbAuthAdapter) => {
        
    }

    init () {
        this.dbStorage = new DbAuthAdapter();
        this.dbStorage.init(PATH_TO_DB);
        this.dbStorage.openDb(this.handleOpenDb);
    }

    private async findUser(username: string, password: string) : Promise<User> {
        const result = await this.dbStorage.getAccessLevelUser(username, password);
        if (!result) return null;
        return new User(username, password, result);
    }

    async auth(username : string, password : string) : Promise<AuthFeedBack> {
        const authUser = await this.findUser(hashString(username), hashString(password));
        await this.dbStorage.closeDb(() => {});
        if (authUser != null)
            return {status: true, access: authUser.getAccessLevel()};
        return {status: false, access : 0};
    }
}