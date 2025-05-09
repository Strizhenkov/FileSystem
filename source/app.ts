import express from 'express';
import path from 'path';
import fileRoutes from './Controller/routes/fileRoutes';

export function runWebServer() {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, './View/static')));
    app.use('/api/file', fileRoutes);

    app.get('/', (_req, res) => {res.sendFile(path.join(__dirname, './View/static/form.html'))});
    
    app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));
}