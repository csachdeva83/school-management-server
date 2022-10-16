import { StatusCodes } from 'http-status-codes';
import ApiError from '../../abstractions/api-error';
import createLogger from '../../lib/logger';
import TimeTable from './time-table.model';
import { TimeTableSql } from './time-table.sql';
import { ISubjectTeacher } from './time-table.types';

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

    public async getToday( classId: string, schoolId: number): Promise<TimeTable> {
        return new Promise((resolve, reject) => {

            logger.info(`Get today time table for classId => ${classId}`);

            const sqlQuery = this.timeTableSql.GET_TODAY_TIMETABLE;
            POOL.query(sqlQuery, [schoolId, classId], (err, resultSet:any) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!resultSet?.[0]) {
                    reject(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'No time table for given id.'));
                }

                resolve(resultSet?.[0]);
            });

        });

    };

    public async getSubjectTeacherMapping( classId: string, schoolId: number): Promise<ISubjectTeacher[]> {
        return new Promise((resolve, reject) => {

            logger.info(`Get subject teacher mapping for classId => ${classId}`);

            const sqlQuery = this.timeTableSql.GET_SUBJECT_TEACHER;
            POOL.query(sqlQuery, [classId, schoolId], (err, resultSet:any) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!resultSet?.[0]) {
                    reject(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'No subject teacher mapping for given id.'));
                }

                resolve(resultSet.map( (obj: any) => obj.result ));
            });

        });

    };

};