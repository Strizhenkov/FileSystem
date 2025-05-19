import express from 'express';
import path from 'path';
import fileRoutes from './Controller/Routes/fileRoutes';
import directoryRoutes from './Controller/Routes/directoryRoutes';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './swaggerConfig';

export function runWebServer() {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, './View/static')));
    app.set('views', path.join(__dirname, './View/templates'));
    app.set('view engine', 'ejs');
    
    
    app.use('/api/file', fileRoutes);
    app.use('/api/directory', directoryRoutes);
    app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('/', (_req, res) => {res.sendFile(path.join(__dirname, './View/static/form.html'))});
    
    app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));
}