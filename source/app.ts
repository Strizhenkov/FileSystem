import express from 'express';
import path from 'path';
import fileRoutes from './Controller/Routes/fileRoutes';
import directoryRoutes from './Controller/Routes/directoryRoutes';
import logsRoutes from './Controller/Routes/logsRoutes';
import swaggerUi from 'swagger-ui-express';
import session from 'express-session';
import {swaggerSpec} from './swaggerConfig';
import authRoutes from './Controller/Routes/authRoutes';
import {requireAuth} from './Controller/Auth/Helpers/authHelpers';

export function runWebServer() {
    const app = express();
    app.use(session({secret: 'key', resave: false, saveUninitialized: true}));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, './View/static')));
    app.set('views', path.join(__dirname, './View/templates'));
    app.set('view engine', 'ejs');
    
    app.use('/', authRoutes);
    app.use('/', logsRoutes);
    app.use('/api/file', fileRoutes);
    app.use('/api/directory', directoryRoutes);
    app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('/', requireAuth, (req, res) => {res.render('form', {user : req.session.user})});
    
    app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));
}