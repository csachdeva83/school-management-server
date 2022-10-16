import { StatusCodes } from 'http-status-codes';
import ApiError from '../../abstractions/api-error';
import createLogger from '../../lib/logger';
import { AttendanceSql } from './attendance.sql';

const logger = createLogger('Attendance Repositry');

export class AttendanceRepositry{
    
    constructor(private attendanceSql = new AttendanceSql()) {}

    public async getPresentCount( studentId: string): Promise<number> {
        return new Promise((resolve, reject) => {

            logger.info(`Get present attendance for studentId => ${studentId}`);

            const sqlQuery = this.attendanceSql.GET_PRESENT_COUNT;
            POOL.query(sqlQuery, [studentId], (err, resultSet:any) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!resultSet?.[0]) {
                    reject(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'No count for given id.'));
                }
                
                resolve(resultSet?.[0]?.present);
            });

        });

    };

    public async getAbsentCount( studentId: string): Promise<number> {
        return new Promise((resolve, reject) => {

            logger.info(`Get absent attendance for studentId => ${studentId}`);

            const sqlQuery = this.attendanceSql.GET_ABSENT_COUNT;
            POOL.query(sqlQuery, [studentId], (err, resultSet:any) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!resultSet?.[0]) {
                    reject(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'No count for given id.'));
                }

                resolve(resultSet?.[0]?.absent);
            });

        });

    };

    public async getTotalCount( studentId: string): Promise<number> {
        return new Promise((resolve, reject) => {

            logger.info(`Get total attendance for studentId => ${studentId}`);

            const sqlQuery = this.attendanceSql.GET_TOTAL_COUNT;
            POOL.query(sqlQuery, [studentId], (err, resultSet:any) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!resultSet?.[0]) {
                    reject(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'No count for given id.'));
                }

                resolve(resultSet?.[0]?.total);
            });

        });

    };

};