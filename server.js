const express = require('express');
const app = express();
const { showDirectory, createFile, deleteFile, renameFile, createDirectory, deleteDirectory, renameDirectory } = require('./index');

app.use(express.json())

app.get('/dir', (req, res) => {
    const path = req.query.path;
    if (!path) return res.status(400).send('Параметр path обязателен');
    const result = showDirectory(path);
    res.setHeader('Content-Type', 'text/plain');
    res.send(result);
});

app.post('/create-file', (req, res) => {
    const path = req.body.path;
    if (!path) return res.status(400).send('Параметр path обязателен');
    const result = createFile(path);
    res.setHeader('Content-Type', 'text/plain');
    res.send(result);
});

app.delete('/delete-file', (req, res) => {
    const path = req.body.path;
    if (!path) return res.status(400).send('Параметр path обязателен');
    const result = deleteFile(path);
    res.setHeader('Content-Type', 'text/plain');
    res.send(result);
});

app.patch('/rename-file', (req, res) => {
    const path = req.body.path;
    const newFileName = req.body.newFileName;
    if (!path || !newFileName) return res.status(400).send('Параметр path и newFileName обязателен');
    const result = renameFile(path, newFileName);
    res.setHeader('Content-Type', 'text/plain');
    res.send(result);
});

app.post('/create-directory', (req, res) => {
    const path = req.body.path;
    if (!path) return res.status(400).send('Параметр path обязателен');
    const result = createDirectory(path);
    res.setHeader('Content-Type', 'text/plain');
    res.send(result);
});

app.delete('/delete-directory', (req, res) => {
    const path = req.body.path;
    if (!path) return res.status(400).send('Параметр path обязателен');
    const result = deleteDirectory(path);
    res.setHeader('Content-Type', 'text/plain');
    res.send(result);
});

app.patch('/rename-directory', (req, res) => {
    const path = req.body.path;
    const newDirName = req.body.newDirName;
    if (!path || !newDirName) return res.status(400).send('Параметр path и newDirName обязателен');
    const result = renameDirectory(path, newDirName);
    res.setHeader('Content-Type', 'text/plain');
    res.send(result);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});