import { ResultSetHeader } from 'mysql2';
import createLogger from '../../lib/logger';
import CreateStudent from './request/create-student.request';
import Student from './student.model';
import { StudentSql } from './student.sql';

const logger = createLogger('Student Repositry');

export class StudentRepositry extends Student{
    
    constructor(private studentSql = new StudentSql()) {
        super();
    }

    public async create(student: CreateStudent, salt: string, hash: string): Promise<boolean> {
        return new Promise((resolve, reject) => {

            logger.info(`Creating a new student => ${JSON.stringify(student)}`);

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
                    logger.info('Transaction began for creating student');
                    connection.query(this.studentSql.CREATE_PASSWORD, [salt, hash], (err2, resultSet1: ResultSetHeader) => {
                        
                        
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
                        student.passwordId = resultSet1.insertId;

                        connection.query(this.studentSql.GET_NEW_STUDENT_ID,[],(err3, resultSet2: ResultSetHeader) => {
                            if(err3){
                                connection.rollback(() => {
                                    logger.error("Couldn't create student id");
                                    connection?.release();
                                    reject(err3);
                                });
                                return;
                            }
                            logger.info(`Student Id => ${resultSet2[0].idNumber}`);
                             
                            // eslint-disable-next-line no-param-reassign
                            student.id = resultSet2[0].idNumber;
                        
                            connection.query(
                                this.studentSql.CREATE_STUDENT,
                                [
                                    student.id,
                                    student.firstName,
                                    student.lastName,
                                    student.birthDate,
                                    student.phoneNumber,
                                    student.email,
                                    student.classId,
                                    student.passwordId,
                                    student.imageLink,
                                    student.schoolId
                                ],
                                (err4, resultSet3: ResultSetHeader) => {
                                    if (err4) {
                                        connection.rollback(() => {
                                            connection?.release();
                                            logger.error("Couldn't create student");
                                            reject(err4);
                                        });
                                        return;
                                    }
    
                                    logger.info('Created student');
                                    connection.commit((err5) => {
                                        logger.info('Commiting Changes');
                                        if (err5) {
                                            logger.error("Couldn't commit to database");
                                            connection.rollback(() => {
                                                connection?.release();
                                                reject(err5);
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
                        });

                    });

                });
            });

        });
    };

    public async getbyId( studentId: string): Promise<Student> {
        return new Promise((resolve, reject) => {

            logger.info(`Get student details by id => ${studentId}`);

            const sqlQuery = this.studentSql.GET_STUDENT_DETAILS_BY_ID;
            POOL.query(sqlQuery, [studentId], (err, resultSet: ResultSetHeader) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(resultSet?.[0]);
            });

        });

    };
};