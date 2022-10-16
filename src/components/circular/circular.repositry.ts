import { StatusCodes } from 'http-status-codes';
import ApiError from '../../abstractions/api-error';
import createLogger from '../../lib/logger';
import Circular from './circular.model';
import { CircularSql } from './circular.sql';

const logger = createLogger('Circular Repositry');

export class CircularRepositry{
    
    constructor(private circularSql = new CircularSql()) {}

    public async getCircular( schoolId: string): Promise<Circular[]> {
        return new Promise((resolve, reject) => {

            logger.info(`Get top 5 circulars for schoolId => ${schoolId}`);

            const sqlQuery = this.circularSql.GET_CIRCULARS;
            POOL.query(sqlQuery, [schoolId], (err, resultSet:any) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!resultSet?.[0]) {
                    reject(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'No circulars for given id.'));
                }
                
                resolve(resultSet);
            });

        });

    };


};