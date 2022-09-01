import { existsSync, mkdirSync } from 'fs';
import { Logger } from 'winston';
import winston = require('winston');

const {
    combine,
    timestamp,
    cli,
    printf,
} = winston.format;

const logDir = './logs';

if (!existsSync(logDir)) {
    mkdirSync(logDir);
}

const createLogger = (scriptName: string): Logger => winston.createLogger({
    level: process.env.NODE_ENV === 'test' ? 'error' : 'info',
    defaultMeta: {
        service: scriptName || 'Default'
    },
    format: combine(
        timestamp(),
        cli(),
        printf(
            (info: winston.Logform.TransformableInfo) => `[${info.timestamp.substring(0, 16)}] ${info.level} - ${process.env.pm_id} :: ${scriptName} ::${info.message}`,
        ),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: `${logDir}/combined.log`
        }),
    ],
});
export default createLogger;
