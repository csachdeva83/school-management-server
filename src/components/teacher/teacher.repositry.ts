import { ResultSetHeader } from 'mysql2';
import { StatusCodes } from 'http-status-codes';
import createLogger from '../../lib/logger';
import Teacher from './teacher.model';
import { TeacherSql } from './teacher.sql';
import CreateTeacher from './request/create-teacher.request';
import ApiError from '../../abstractions/api-error';

const logger = createLogger('Teacher Repositry');

export class TeacherRepositry extends Teacher{
    
    constructor(private teacherSql = new TeacherSql()) {
        super();
    }

    public async getbyId( teacherId: string): Promise<Teacher> {
        return new Promise((resolve, reject) => {

            logger.info(`Get teacher details by id => ${teacherId}`);

            const sqlQuery = this.teacherSql.GET_TEACHER_DETAILS_BY_ID;
            POOL.query(sqlQuery, [teacherId], (err, resultSet: ResultSetHeader) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!resultSet?.[0]) {
                    reject(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'No teacher available for given id.'));
                }

                resolve(resultSet?.[0]);
            });

        });

    };

    public async create(teacher: CreateTeacher, salt: string, hash: string): Promise<boolean> {
        return new Promise((resolve, reject) => {

            logger.info(`Creating a new teacher => ${JSON.stringify(teacher)}`);

            POOL.getConnection((err, connection) => {
                if (err) {
                    logger.error("Couldn't get connection");
                    reject(err);
                    return;
                }
                logger.info('Got connection from pool');
                
                connection.beginTransaction((err1) => {
                    if (err1) {
                        logger.error("Couldn't begin transaction");
                        connection?.release();
                        reject(err1);
                        return;
                    }
                    logger.info('Transaction began for creating teacher');
                    connection.query(this.teacherSql.CREATE_PASSWORD, [salt, hash], (err2, resultSet1: ResultSetHeader) => {
                        
                        
                        if (err2) {
                            connection.rollback(() => {
                                logger.error("Couldn't create password");
                                connection?.release();
                                reject(err2);
                            });
                            return;
                        }
                        logger.info('Password Created');
                        
                        // eslint-disable-next-line no-param-reassign
                        teacher.passwordId = resultSet1.insertId;

                        connection.query(this.teacherSql.GET_NEW_TEACHER_ID,[],(err3, resultSet2: ResultSetHeader) => {
                            if(err3){
                                connection.rollback(() => {
                                    logger.error("Couldn't create teacher id");
                                    connection?.release();
                                    reject(err3);
                                });
                                return;
                            }
                            logger.info(`Teacher Id => ${resultSet2[0].idNumber}`);
                             
                            // eslint-disable-next-line no-param-reassign
                            teacher.id = resultSet2[0].idNumber;

                            connection.query(
                                this.teacherSql.CREATE_TEACHER,
                                [
                                    teacher.id,
                                    teacher.firstName,
                                    teacher.lastName,
                                    teacher.birthDate,
                                    teacher.phoneNumber,
                                    teacher.email,
                                    JSON.stringify(teacher.subjectIds),
                                    teacher.passwordId,
                                    teacher.imageLink,
                                    teacher.schoolId
                                ],
                                (err4, resultSet3: ResultSetHeader) => {
                                    if (err4) {
                                        connection.rollback(() => {
                                            connection?.release();
                                            logger.error("Couldn't create teacher");
                                            reject(err4);
                                        });
                                        return;
                                    }
    
                                    logger.info('Created teacher');
                                    connection.commit((err5) => {
                                        logger.info('Commiting Changes');
                                        if (err5) {
                                            logger.error("Couldn't commit to database");
                                            connection.rollback(() => {
                                                connection?.release();
                                                reject(err4);
                                            });
                                        }
                                        else{
                                            logger.info('Resolving promise');
                                            
                                            connection?.release();
                                            resolve(resultSet3.affectedRows === 1);        
                                        }
                                    });
                                }
                            );
                        } );
                    });

                });
            });

        });
    };
};