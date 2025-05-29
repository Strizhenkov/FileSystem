import {Request, Response, NextFunction} from 'express';

export function requireAuth(req : Request, res : Response, next : NextFunction) {
    if (!req.session?.user) {
        req.session.redirectTo = req.originalUrl;
        return res.redirect("/login");
    }
    next();
}