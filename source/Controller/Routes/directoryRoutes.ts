import express from 'express';
import {CommandOperator, ResourceType} from '../commandOperator';

const router = express.Router();
const obj = ResourceType.DIRECTORY;

/**
 * @swagger
 * tags:
 *   name: Directory
 *   description: Работа с директориями
 */

/**
 * @swagger
 * /api/directory/create:
 *   post:
 *     summary: Создать директорию
 *     tags: [Directory]
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
 *                 description: Путь к директории
 *     responses:
 *       200:
 *         description: Директория успешно создана
 *       400:
 *         description: Неверные данные запроса
 */
router.post('/create', async (req, res) => {
    const path = req.body.path;
    if (!path) return res.status(400).send('Путь к директории не передан');
    const operator = new CommandOperator(obj, path, req.session?.user?.accessLevel, req.session?.user?.username);
    await operator.initAccess();
    await operator.initLogs();
    const result = operator.create();
    res.redirect('/');
});

/**
 * @swagger
 * /api/directory/delete:
 *   delete:
 *     summary: Удалить директорию
 *     tags: [Directory]
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
 *                 description: Путь к директории
 *     responses:
 *       200:
 *         description: Директория успешно удалена
 *       400:
 *         description: Неверные данные запроса
 */
router.post('/delete', async (req, res) => {
    const path = req.body.path;
    if (!path) return res.status(400).send('Путь к директории не передан');
    const operator = new CommandOperator(obj, path, req.session?.user?.accessLevel, req.session?.user?.username);
    await operator.initAccess();
    await operator.initLogs();
    const result = operator.delete();
    res.redirect('/');
});

/**
 * @swagger
 * /api/directory/rename:
 *   patch:
 *     summary: Переименовать директорию
 *     tags: [Directory]
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
 *                 description: Путь к директории
 *               newName:
 *                 type: string
 *                 description: Новое имя директории
 *     responses:
 *       200:
 *         description: Директория успешно переименован
 *       400:
 *         description: Неверные данные запроса
 */
router.post('/rename', async (req, res) => {
    const {path, newName} = req.body;
    if (!path) return res.status(400).send('Путь к директории не передан');
    if (!newName) return res.status(400).send('Новое имя директории не передано');
    const operator = new CommandOperator(obj, path, req.session?.user?.accessLevel, req.session?.user?.username);
    await operator.initAccess();
    await operator.initLogs();
    const result = operator.rename(newName);
    res.redirect('/');
});

/**
 * @swagger
 * /api/directory/get:
 *   get:
 *     summary: Получить содержимое папки
 *     tags: [Directory]
 *     parameters:
 *       - in: query
 *         name: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Содержимое папки получено
 *       400:
 *         description: Неверные данные запроса
 */
router.get('/get', async (req, res) => {
    const path = req.query.path;
    if (!path) return res.status(400).send('Путь к директории не передан');
    const operator = new CommandOperator(obj, path, req.session?.user?.accessLevel, req.session?.user?.username);
    await operator.initAccess();
    await operator.initLogs();
    const data = await operator.getData();
    res.render('directoryData', {path: path, data});
});

export default router;