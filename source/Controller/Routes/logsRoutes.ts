import express from 'express';
import {DbLogsAdapter} from '../DbAdapters/dbLogsAdapter';

const router = express.Router();

const PATH_TO_LOGS_DB = 'source/Model/Logs.db';

router.get('/logs', async (req, res) => {
    if (req.session.user.accessLevel !== 2) {
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