import { ResultSetHeader } from 'mysql2';
import createLogger from '../../lib/logger';
import Teacher from './teacher.model';
import { TeacherSql } from './teacher.sql';

const logger = createLogger('Teacher Repositry');

export class TeacherRepositry extends Teacher{
    
    constructor(private studentSql = new TeacherSql()) {
        super();
    }

    public async getbyId( teacherId: string): Promise<Teacher> {
        return new Promise((resolve, reject) => {

            logger.info(`Get teacher details by id => ${teacherId}`);

            const sqlQuery = this.studentSql.GET_TEACHER_DETAILS_BY_ID;
            POOL.query(sqlQuery, [teacherId], (err, resultSet: ResultSetHeader) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(resultSet?.[0]);
            });

        });

    };
};