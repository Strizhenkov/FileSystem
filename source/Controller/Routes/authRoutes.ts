import express from 'express';
import {AuthService} from '../Auth/authService';
import path from 'path';

const router = express.Router();
const auth = new AuthService();

const basePath = path.join(__dirname, '../../../source');
router.get('/login', (_req, res) => {res.sendFile(path.resolve(basePath, 'View/static/login.html'))});

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const result = auth.auth(username, password);
    if (result.status) {
        req.session.user = {
            username,
            accessLevel: result.access
        };
        const redirectTo = req.session.redirectTo || '/';
        delete req.session.redirectTo;
        return res.redirect(redirectTo);
    }
    res.status(400).send('Неверный логин или пароль');
});

router.post('/skip', (req, res) => {
    const result = auth.auth("default", "");
    req.session.user = {
        username: "default",
        accessLevel: result.access
    };
    const redirectTo = req.session.redirectTo || '/';
    delete req.session.redirectTo;
    res.redirect(redirectTo);
});

export default router;