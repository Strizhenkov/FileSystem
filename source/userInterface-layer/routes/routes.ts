const express = require('express');
const router = express.Router();
const path = require('path');
const { createFile } = require('../commandOperator');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/form.html'));
});

router.post('/create-file', (req, res) => {
    const filePath = req.body.path;
    if (!filePath) {
        return res.status(400).send('Путь к файлу не передан');
    }

    const result = createFile(filePath);
    res.redirect('/');
});

module.exports = router;