import * as mysql from 'mysql2';
import createLogger from '../lib/logger';

const logger = createLogger('DB Config');

const { POOL } = global;

export const initializeDB = () => {
    if(!global.POOL){
        global.POOL = mysql.createPool({
            host            : process.env.HOST,
            user            : process.env.DATABASE_USER,
            password        : process.env.PASSWORD,
            database        : process.env.DATABASE_NAME,
            port            : Number(process.env.DATABASE_PORT),
            connectionLimit : 10,
            queueLimit      : 0
        });    
    }
    
    global.POOL.getConnection((err, connection) => {
        if (err) {
            logger.error(err?.message);
            logger.error(err?.stack);
            throw err;
        }
        logger.info('Database connected');
        connection?.release();
    });

};
export const destructDB = () => {
    logger.info('Destructing DB');
    global?.POOL?.end();
};

export default POOL;
