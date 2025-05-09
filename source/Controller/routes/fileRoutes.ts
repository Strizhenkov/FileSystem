import express from 'express';
import path from 'path';
import {createFile, deleteFile, renameFile} from '../commandOperator';

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/form.html'));
});

/**
 * @swagger
 * /api/file/create:
 *   post:
 *     summary: Создать файл
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *     response:
 *       200:
 *         description: Файл создан
 */
router.post('/create', (req, res) => {
    const filePath = req.body.path;
    if (!filePath) return res.status(400).send('Путь к файлу не передан');
    const result = createFile(filePath);
    res.redirect('/');
});

/**
 * @swagger
 * /api/file/delete:
 *   delete:
 *     summary: Удалить файл
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *     response:
 *       200:
 *         description: Файл удален
 */
router.post('/delete', (req, res) => {
    const filePath = req.body.path;
    if (!filePath) return res.status(400).send('Путь к файлу не передан');
    const result = deleteFile(filePath);
    res.redirect('/');
});

/**
 * @swagger
 * /api/file/rename:
 *   patch:
 *     summary: Переименовать файл
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *               newName:
 *                 type: string
 *     response:
 *       200:
 *         description: Файл переименован
 */
router.post('/rename', (req, res) => {
    const {path, newName} = req.body;
    if (!path) return res.status(400).send('Путь к файлу не передан');
    if (!newName) return res.status(400).send('Новое имя файла не передан');
    const result = renameFile(path, newName);
    res.redirect('/');
});

export default router;