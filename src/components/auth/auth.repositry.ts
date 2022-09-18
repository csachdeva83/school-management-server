import { ResultSetHeader } from 'mysql2';
import createLogger from '../../lib/logger';
import { AuthSql } from './auth.sql';

const logger = createLogger('Auth Repositry');

export class AuthRepositry {

    constructor(private authSql = new AuthSql()) {}

    public async validatePasswordForStudent(studentId: string, hashedPassword: string): Promise<{count: number}> {
        return new Promise((resolve, reject) => {

            logger.info('Compare hashed password of student');

            const sqlQuery = this.authSql.VALIDATE_PASSWORD_FOR_STUDENT;
            POOL.query(sqlQuery, [studentId, hashedPassword], (err, resultSet) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(resultSet?.[0]);
            });

        });
    };

    public async validatePasswordForTeacher(teacherId: string, hashedPassword: string): Promise<{count: number}> {
        return new Promise((resolve, reject) => {

            logger.info('Compare hashed password of teacher');

            const sqlQuery = this.authSql.VALIDATE_PASSWORD_FOR_TEACHER;
            POOL.query(sqlQuery, [teacherId, hashedPassword], (err, resultSet) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                resolve(resultSet?.[0]);
            });

        });
    };

    public async getSaltForStudent(studentId: string): Promise<{ salt: string }> {
        return new Promise((resolve, reject) => {

            logger.info(`Get salt of student by id => ${studentId}`);

            const sqlQuery = this.authSql.GET_SALT_FOR_STUDENT;
            POOL.query(sqlQuery, [studentId], (err, resultSet: ResultSetHeader) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(resultSet?.[0]);
            });

        });

    };

    public async getSaltForTeacher(teacherId: string): Promise<{ salt: string }> {
        return new Promise((resolve, reject) => {

            logger.info(`Get salt of teacher by id => ${teacherId}`);

            const sqlQuery = this.authSql.GET_SALT_FOR_TEACHER;
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