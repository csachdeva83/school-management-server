import { ResultSetHeader } from 'mysql2';
import createLogger from '../../lib/logger';
import Auth from './auth.model';
import { AuthSql } from './auth.sql';

const logger = createLogger('Student Repositry');

export class AuthRepositry extends Auth {

    constructor(private authSql = new AuthSql()) {
        super();
    }

    public async getSaltAndHashByEmail(email: string): Promise<{ salt, hash }> {
        return new Promise((resolve, reject) => {

            logger.info(`Getting salt and hash of user by email id => ${email}`);

            const sqlQuery = this.authSql.GET_SALT_AND_HASH_BY_EMAIL_ID;
            POOL.query(sqlQuery, [email], (err, resultSet: ResultSetHeader) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(resultSet?.[0]);
            });

        });

    };
};