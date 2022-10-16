import { StatusCodes } from 'http-status-codes';
import { ResultSetHeader } from 'mysql2';
import ApiError from '../../abstractions/api-error';
import createLogger from '../../lib/logger';
import { TSyllabus } from './syllabus.types';
import { SyllabusSql } from './syllabus.sql';

const logger = createLogger('Syllabus Repositry');

export class SyllabusRepositry{
    
    constructor(private syllabusSql = new SyllabusSql()) {}

    public async get( classId: string, schoolId: number): Promise<TSyllabus[]> {
        return new Promise((resolve, reject) => {

            logger.info(`Get syllabus for classId => ${classId}`);

            const sqlQuery = this.syllabusSql.GET_SYLLABUS;
            POOL.query(sqlQuery, [classId, schoolId], (err, resultSet:any) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!resultSet?.[0]) {
                    reject(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'No syllabus for given id.'));
                }

                resolve(resultSet.map( (obj: any) => obj.result ));
            });

        });

    };

};