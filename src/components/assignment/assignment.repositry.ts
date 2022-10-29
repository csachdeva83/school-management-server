import { StatusCodes } from 'http-status-codes';
import { ResultSetHeader } from 'mysql2';
import ApiError from '../../abstractions/api-error';
import createLogger from '../../lib/logger';
import Assignment from './assignment.model';
import { AssignmentSql } from './assignment.sql';
import CreateAssignment from './request/create-assignment.request';
import SubmitAssignmentMarks from './request/submit-assignment-marks.request';
import SubmittedAssignment from './submitted-assignment.model';

const logger = createLogger('Assignment Repositry');

export class AssignmentRepositry extends Assignment{
    
    constructor(private assignmentSql = new AssignmentSql()) {
        super();
    }

    public async upload( assignment: CreateAssignment, schoolId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {

            logger.info(`Uploading a new assignment => ${JSON.stringify(assignment)}`);

            const sqlQuery = this.assignmentSql.UPLOAD_ASSIGNMENT;
            POOL.query(sqlQuery, [
                assignment.classId,
                assignment.pdfLink,
                assignment.submissionDate,
                assignment.teacherId,
                assignment.title,
                assignment.totalMarks,
                schoolId
            ], (err, resultSet: ResultSetHeader) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(resultSet.affectedRows === 1);
            });

        });

    };

    public async uploadMarks( body: SubmitAssignmentMarks ): Promise<boolean> {
        return new Promise((resolve, reject) => {

            logger.info(`Upload student assignment marks => ${JSON.stringify(body)}`);

            const sqlQuery = this.assignmentSql.UPLOAD_STUDENT_MARKS_FOR_ASSIGNMENT;
            POOL.query(sqlQuery, [
                body.assignmentId,
                body.marksObtained,
                body.status,
                body.studentId
            ], (err, resultSet: ResultSetHeader) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(resultSet.affectedRows === 1);
            });

        });

    };

    public async upcoming( classId: string, schoolId: number): Promise<Assignment[]> {
        return new Promise((resolve, reject) => {

            logger.info(`Get upcoming assignments by classId => ${classId}`);

            const sqlQuery = this.assignmentSql.GET_UPCOMING_ASSIGNMENTS;
            POOL.query(sqlQuery, [classId, schoolId], (err, resultSet:any) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!resultSet?.[0]) {
                    reject(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'No upcoming assignments with given id.'));
                }

                resolve(resultSet);
            });

        });

    };

    public async pending( studentId: string, schoolId: number): Promise<Assignment[]> {
        return new Promise((resolve, reject) => {

            logger.info(`Get pending assignments by studentId => ${studentId}`);

            const sqlQuery = this.assignmentSql.GET_PENDING_ASSIGNMENTS;
            POOL.query(sqlQuery, [schoolId, studentId, studentId], (err, resultSet:any) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!resultSet?.[0]) {
                    reject(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'No pending assignments with given id.'));
                }

                resolve(resultSet);
            });

        });

    };

    public async submitted( studentId: string, schoolId: number): Promise<SubmittedAssignment[]> {
        return new Promise((resolve, reject) => {

            logger.info(`Get submitted assignments by studentId => ${studentId}`);

            const sqlQuery = this.assignmentSql.GET_SUBMITTED_ASSIGNMENTS;
            POOL.query(sqlQuery, [studentId, schoolId], (err, resultSet:any) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!resultSet?.[0]) {
                    reject(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'No submitted assignments with given id.'));
                }

                resolve(resultSet);
            });

        });

    };

    public async uploaded( teacherId: string, schoolId: number): Promise<Assignment[]> {
        return new Promise((resolve, reject) => {

            logger.info(`Get uploaded assignments by teacherId => ${teacherId}`);

            const sqlQuery = this.assignmentSql.GET_UPLOADED_ASSIGNMENTS;
            POOL.query(sqlQuery, [teacherId, schoolId], (err, resultSet:any) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!resultSet?.[0]) {
                    reject(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'No uploaded assignments with given id.'));
                }

                resolve(resultSet);
            });

        });

    };

    public async delete( assignmentId: string ): Promise<boolean> {
        return new Promise((resolve, reject) => {

            logger.info(`Delete assignment => ${assignmentId}`);

            const sqlQuery = this.assignmentSql.DELETE_ASSIGNMENT;
            POOL.query(sqlQuery, [assignmentId], (err, resultSet:ResultSetHeader) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(resultSet.affectedRows === 1);
            });

        });

    };
};