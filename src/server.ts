import * as http from 'http';
import { AddressInfo } from 'net';
import { setGlobalEnvironment } from './global';
import App  from './app';
import Environment from './environments/environment';
import createLogger from './lib/logger';
import { initializeDB } from './configs/db.config';

const logger = createLogger('server.ts');

const env: Environment = new Environment();
setGlobalEnvironment(env);
const app: App = new App();
let server: http.Server;

function serverError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }
    // handle specific error codes here.
    throw error;
}

function serverListening(): void {
    const addressInfo: AddressInfo = <AddressInfo>server.address();
    logger.info(`Listening on ${addressInfo.address}:${env.port}`);
}

app.init().then(() => {
    app.express.set('port', env.port);

    server = app.httpServer; // http.createServer(App);
    server.on('error', serverError);
    server.on('listening', serverListening);
    server.listen(env.port);
    initializeDB();
}).catch((err: Error) => {
    logger.info('app.init error');
    logger.error(err.name);
    logger.error(err.message);
    logger.error(err.stack);
});

process.on('unhandledRejection', (reason: Error) => {
    logger.error('Unhandled Promise Rejection: reason:', reason.message);
    logger.error(reason.stack);
    // application specific logging, throwing an error, or other logic here
});


