import { StatusCodes } from 'http-status-codes';
import ApiError from '../../abstractions/api-error';
import createLogger from '../../lib/logger';
import Marks, { MarksPerformacePercentage } from './marks.model';
import { MarksSql } from './marks.sql';

const logger = createLogger('Marks Repositry');

export class MarksRepositry extends Marks{
    
    constructor(private marksSql = new MarksSql()) {
        super();
    }

    public async get( studentId: string, schoolId: number): Promise<Marks[]> {
        return new Promise((resolve, reject) => {

            logger.info(`Get marks for studentId => ${studentId}`);

            const sqlQuery = this.marksSql.GET_MARKS;
            POOL.query(sqlQuery, [studentId, schoolId], (err, resultSet:any) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!resultSet?.[0]) {
                    reject(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'No marks for given id.'));
                }

                resolve(resultSet);
            });

        });

    };

    public async getPerformancePercentage( studentId: string, schoolId: number): Promise<MarksPerformacePercentage[]> {
        return new Promise((resolve, reject) => {

            logger.info(`Get performance percentage for studentId => ${studentId}`);

            const sqlQuery = this.marksSql.GET_PERFORMANCE_PERCENTAGE;
            POOL.query(sqlQuery, [studentId, schoolId], (err, resultSet:any) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!resultSet?.[0]) {
                    reject(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'No percentages available for given id.'));
                }

                resolve(resultSet?.[0]);
            });

        });

    };

};