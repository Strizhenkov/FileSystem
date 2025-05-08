import express from 'express';
const router = express.Router();
import path from 'path';
import {createFile, deleteFile, renameFile} from '../commandOperator';

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/form.html'));
});

router.post('/create-file', (req, res) => {
    const filePath = req.body.path;
    if (!filePath) return res.status(400).send('Путь к файлу не передан');
    const result = createFile(filePath);
    res.redirect('/');
});

router.post('/delete-file', (req, res) => {
    const filePath = req.body.path;
    if (!filePath) return res.status(400).send('Путь к файлу не передан');
    const result = deleteFile(filePath);
    res.redirect('/');
});

router.post('/rename-file', (req, res) => {
    const { path, newName } = req.body;
    if (!path) return res.status(400).send('Путь к файлу не передан');
    if (!newName) return res.status(400).send('Новое имя файла не передан');
    const result = renameFile(path, newName);
    res.redirect('/');
});

export default router;