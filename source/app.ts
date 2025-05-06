const express = require('express');
const path = require('path');
const app = express();
const fileRoutes = require('./userInterface-layer/routes/routes');
export function runWebServer() {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.set('views', path.join(__dirname, 'views'));

    app.use('/', fileRoutes);

    app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));
}