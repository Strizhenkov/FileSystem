import {AccessLevel} from "../../../Entities/FileSystemItems/accessLevel";

export type AuthFeedBack = {
    status: boolean;
    access: AccessLevel;
};