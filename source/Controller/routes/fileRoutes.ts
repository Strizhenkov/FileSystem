import express from 'express';
import path from 'path';
import {createFile, deleteFile, renameFile} from '../commandOperator';

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/form.html'));
});

router.post('/create', (req, res) => {
    const filePath = req.body.path;
    if (!filePath) return res.status(400).send('Путь к файлу не передан');
    const result = createFile(filePath);
    res.redirect('/');
});

router.post('/delete', (req, res) => {
    const filePath = req.body.path;
    if (!filePath) return res.status(400).send('Путь к файлу не передан');
    const result = deleteFile(filePath);
    res.redirect('/');
});

router.post('/rename', (req, res) => {
    const {path, newName} = req.body;
    if (!path) return res.status(400).send('Путь к файлу не передан');
    if (!newName) return res.status(400).send('Новое имя файла не передан');
    const result = renameFile(path, newName);
    res.redirect('/');
});

export default router;