import {Request, Response, NextFunction} from 'express';
import {createHash} from 'crypto';
import {AccessLevel} from "../../../Entities/FileSystemItems/accessLevel";

export type AuthFeedBack = {
    status: boolean;
    access: AccessLevel;
};


export function requireAuth(req : Request, res : Response, next : NextFunction) {
    if (!req.session?.user) {
        req.session.redirectTo = req.originalUrl;
        return res.redirect("/login");
    }
    next();
}

export function hashString(input: string): string {
    return createHash('sha256').update(input).digest('hex');
}