import { ResultSetHeader } from 'mysql2';
import createLogger from '../../lib/logger';
import CreateStudent from './create-student.request';
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

            // const studentSql = new StudentSql();

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
                    logger.info('Transaction began for creating user');
                    connection.query(this.studentSql.CREATE_PASSWORD, [salt, hash], (err2, result: ResultSetHeader) => {
                        
                        
                        if (err2) {
                            connection.rollback(() => {
                                logger.error("Couldn't create password");
                                connection?.release();
                                reject(err2);
                            });
                            return;
                        }
                        logger.info('Created Password');
                        
                        // eslint-disable-next-line no-param-reassign
                        student.passwordId = result.insertId;

                        connection.query(
                            this.studentSql.CREATE_STUDENT,
                            [
                                student.firstName,
                                student.lastName,
                                student.birthDate,
                                student.phoneNumber,
                                student.email,
                                student.classId,
                                student.passwordId
                            ],
                            (err3, resultSet2: ResultSetHeader) => {
                                if (err3) {
                                    connection.rollback(() => {
                                        connection?.release();
                                        logger.error("Couldn't create user");
                                        reject(err3);
                                    });
                                    return;
                                }

                                logger.info('Created User');
                                connection.commit((err4) => {
                                    logger.info('Commiting Changes');
                                    if (err4) {
                                        logger.error("Couldn't commit to database");
                                        connection.rollback(() => {
                                            connection?.release();
                                            reject(err4);
                                        });
                                    }
                                    else{
                                        logger.info('Resolving promise');
                                        
                                        connection?.release();
                                        resolve(resultSet2.affectedRows === 1);        
                                    }
                                });
                            }
                        );
                    });

                });
            });

        });
    };
};