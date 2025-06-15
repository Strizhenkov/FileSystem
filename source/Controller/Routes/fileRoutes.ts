import express from 'express';
import {CommandOperator, ResourceType} from '../commandOperator';

const router = express.Router();
const obj = ResourceType.FILE;

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
router.post('/create', async (req, res) => {
    const path = req.body.path;
    console.log('path =', path); 
    if (!path) return res.status(400).send('Путь к файлу не передан');
    const operator = new CommandOperator(obj, path, req.session?.user?.accessLevel, req.session?.user?.username);
    await operator.initAccess();
    await operator.initLogs();
    const result = operator.create();
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
router.post('/delete', async (req, res) => {
    const path = req.body.path;
    if (!path) return res.status(400).send('Путь к файлу не передан');
    const operator = new CommandOperator(obj, path, req.session?.user?.accessLevel, req.session?.user?.username);
    await operator.initAccess();
    await operator.initLogs();
    const result = operator.delete();
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
router.post('/rename', async (req, res) => {
    const {path, newName} = req.body;
    if (!path) return res.status(400).send('Путь к файлу не передан');
    if (!newName) return res.status(400).send('Новое имя файла не передан');
    const operator = new CommandOperator(obj, path, req.session?.user?.accessLevel, req.session?.user?.username);
    await operator.initAccess();
    await operator.initLogs();
    const result = operator.rename(newName);
    res.redirect('/');
});

export default router;