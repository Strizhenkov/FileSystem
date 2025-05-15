import express from 'express';
import {createFile, deleteFile, renameFile} from '../commandOperator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: File
 *   description: Работа с файлами
 */

/**
 * @swagger
 * /api/file/create:
 *   post:
 *     summary: Создать файл
 *     tags: [File]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - path
 *             properties:
 *               path:
 *                 type: string
 *                 description: Путь к файлу
 *     responses:
 *       200:
 *         description: Файл успешно создан
 *       400:
 *         description: Неверные данные запроса
 */
router.post('/create', (req, res) => {
    const path = req.body.path;
    console.log('path =', path); 
    if (!path) return res.status(400).send('Путь к файлу не передан');
    const result = createFile(path);
    res.redirect('/');
});

/**
 * @swagger
 * /api/file/delete:
 *   delete:
 *     summary: Удалить файл
 *     tags: [File]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - path
 *             properties:
 *               path:
 *                 type: string
 *                 description: Путь к файлу
 *     responses:
 *       200:
 *         description: Файл успешно удален
 *       400:
 *         description: Неверные данные запроса
 */
router.post('/delete', (req, res) => {
    const path = req.body.path;
    if (!path) return res.status(400).send('Путь к файлу не передан');
    const result = deleteFile(path);
    res.redirect('/');
});

/**
 * @swagger
 * /api/file/rename:
 *   patch:
 *     summary: Переименовать файл
 *     tags: [File]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - path
 *               - newName
 *             properties:
 *               path:
 *                 type: string
 *                 description: Путь к файлу
 *               newName:
 *                 type: string
 *                 description: Новое имя файла
 *     responses:
 *       200:
 *         description: Файл успешно переименован
 *       400:
 *         description: Неверные данные запроса
 */
router.post('/rename', (req, res) => {
    const {path, newName} = req.body;
    if (!path) return res.status(400).send('Путь к файлу не передан');
    if (!newName) return res.status(400).send('Новое имя файла не передан');
    const result = renameFile(path, newName);
    res.redirect('/');
});

export default router;