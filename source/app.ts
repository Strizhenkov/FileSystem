import express from 'express';
import path from 'path';
const app = express();
import fileRoutes from './userInterface-layer/routes/routes';

export function runWebServer() {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.set('views', path.join(__dirname, 'views'));

    app.use('/', fileRoutes);

    app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));
}