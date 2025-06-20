import express from 'express';
import {DbLogsAdapter} from '../DbAdapters/dbLogsAdapter';
import {getUserFromSession} from '../Auth/Helpers/authHelpers';
import { PATH_TO_LOGS_DB } from '../../Model/DbPath';

const router = express.Router();

router.get('/logs', async (req, res) => {
    if (getUserFromSession(req).accessLevel !== 2) {
        return res.status(403).send('Доступ запрещен');
    }

    const logger = new DbLogsAdapter();
    logger.init(PATH_TO_LOGS_DB);
    await logger.openDb(() => {});

    const logs = await logger.getAllLogs();
    await logger.closeDb(() => {});

    res.render('logsPage', { logs });
});

export default router;