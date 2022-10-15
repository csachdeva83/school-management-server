import { StatusCodes } from 'http-status-codes';
import { ResultSetHeader } from 'mysql2';
import ApiError from '../../abstractions/api-error';
import createLogger from '../../lib/logger';
import TimeTable from './time-table.model';
import { TimeTableSql } from './time-table.sql';

const logger = createLogger('TimeTable Repositry');

export class TimeTableRepositry extends TimeTable{
    
    constructor(private timeTableSql = new TimeTableSql()) {
        super();
    }

    public async get( classId: string, schoolId: number): Promise<TimeTable[]> {
        return new Promise((resolve, reject) => {

            logger.info(`Get time table for classId => ${classId}`);

            const sqlQuery = this.timeTableSql.GET_TIMETABLE;
            POOL.query(sqlQuery, [schoolId, classId], (err, resultSet:any) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!resultSet?.[0]) {
                    reject(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'No time table for given id.'));
                }

                resolve(resultSet);
            });

        });

    };

};