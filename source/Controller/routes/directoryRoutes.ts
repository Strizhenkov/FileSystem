import express from 'express';
import {createDirectory, deleteDirectory, renameDirectory} from '../commandOperator';

const router = express.Router();

/**
 * @swagger
 * /api/directory/create:
 *   post:
 *     summary: Создать папку
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
 *         description: Папка создана
 */
router.post('/create', (req, res) => {
    const path = req.body.path;
    if (!path) return res.status(400).send('Путь к директории не передан');
    const result = createDirectory(path);
    res.redirect('/');
});

/**
 * @swagger
 * /api/directory/delete:
 *   delete:
 *     summary: Удалить папку
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
 *         description: Папка удалена
 */
router.post('/delete', (req, res) => {
    const path = req.body.path;
    if (!path) return res.status(400).send('Путь к директории не передан');
    const result = deleteDirectory(path);
    res.redirect('/');
});

/**
 * @swagger
 * /api/directory/rename:
 *   patch:
 *     summary: Переименовать папку
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
 *         description: Папка переименована
 */
router.post('/rename', (req, res) => {
    const {path, newName} = req.body;
    if (!path) return res.status(400).send('Путь к директории не передан');
    if (!newName) return res.status(400).send('Новое имя директории не передано');
    const result = renameDirectory(path, newName);
    res.redirect('/');
});

export default router;