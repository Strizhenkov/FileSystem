import express from 'express';
import path from 'path';
import fileRoutes from './Controller/routes/routes';
const app = express();

export function runWebServer() {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.set('views', path.join(__dirname, 'views'));

    app.use('/', fileRoutes);

    app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));
}