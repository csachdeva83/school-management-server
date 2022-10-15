import { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import makeValidateBody from '../../middleware/request-body-validator';
import createLogger from '../../lib/logger';
import BaseApi from '../base-api';
import CustomRequest from '../../abstractions/custom-request';
import ApiResponse from '../../abstractions/api-responses';
import ApiError from '../../abstractions/api-error';
import CreateAssignment from './request/create-assignment.request';
import Assignment from './assignment.model';
import { AssignmentService } from './assignment.service';
import { authenticateToken } from '../../middleware/jwt.middleware';
import SubmittedAssignment from './submitted-assignment.model';
import SubmitAssignmentMarks from './request/submit-assignment-marks.request';

const logger = createLogger('Assignment Controller');

export default class AssignmentController extends BaseApi {
    
    constructor(express: Application, private assignmentService = new AssignmentService()) {
        super();
        this.register(express);
        if (process.env.pm_id === '0') logger.info(`Registering ${JSON.stringify(logger.defaultMeta?.service)}`);
    }


    public register(express: Application): void {
        express.use('/assignment', this.router);
        this.router.get('/upcoming', authenticateToken, this.upcoming);
        this.router.get('/pending', authenticateToken, this.pending);
        this.router.get('/submitted', authenticateToken, this.submitted);
        this.router.post('/upload', authenticateToken, makeValidateBody(CreateAssignment), this.upload);
        this.router.get('/uploaded', authenticateToken, this.uploaded);
        this.router.post('/marks', authenticateToken, makeValidateBody(SubmitAssignmentMarks), this.uploadMarks);  
        this.router.get('/delete', authenticateToken, this.delete);

    }

    public upload = async (req: CustomRequest<CreateAssignment>, res: Response<ApiResponse<Assignment> | ApiError>) => {
        try {

            logger.info(`Upload a new assignment by ${req?.body?.teacherId} for ${req?.body?.classId}`);

            const isCreated = await this.assignmentService.upload(req?.body,res?.locals?.schoolId);
            if (isCreated) {
                const newAssignment = new Assignment();
                newAssignment.classId = req?.body?.classId;
                newAssignment.pdfLink = req?.body?.pdfLink;
                newAssignment.submissionDate = req?.body?.submissionDate;
                newAssignment.title = req?.body?.title;
                newAssignment.totalMarks = req?.body?.totalMarks;

                res.status(StatusCodes.OK)
                    .send(new ApiResponse(StatusCodes.OK, 'SUCCESS', newAssignment, 'Assignment uploaded successfully'));
            }
            else {
                res.status(StatusCodes.EXPECTATION_FAILED)
                    .send(new ApiError(StatusCodes.EXPECTATION_FAILED, 'FAILURE', 'Assignment could not be uploaded'));
            }

        } catch (err: any) {
            if (err?.status === 'FAILURE') {
                logger.debug(err?.message);
                logger.debug(err?.stack);
                res.status(err?.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(new ApiError(err?.statusCode, err?.status, err.message, err.name));
            }
            else {
                logger.error(err?.message);
                logger.error(err?.stack);
                res.status(err?.statusCode ?? StatusCodes.BAD_REQUEST)
                    .send(new ApiError(err?.statusCode, 'ERROR', err.message, err.name));
            }
        }
    };

    public uploadMarks = async (req: CustomRequest<SubmitAssignmentMarks>, res: Response<ApiResponse<unknown> | ApiError>) => {
        try {

            logger.info(`Upload assignment ${req?.body?.assignmentId} marks for ${req?.body?.studentId}`);

            const isUploaded = await this.assignmentService.uploadMarks(req?.body);
            if (isUploaded) {

                res.status(StatusCodes.OK)
                    .send(new ApiResponse(StatusCodes.OK, 'SUCCESS',{}, 'Student marks for assignment uploaded successfully'));
            }
            else {
                res.status(StatusCodes.EXPECTATION_FAILED)
                    .send(new ApiError(StatusCodes.EXPECTATION_FAILED, 'FAILURE', 'Student marks for assignment could not be uploaded'));
            }

        } catch (err: any) {
            if (err?.status === 'FAILURE') {
                logger.debug(err?.message);
                logger.debug(err?.stack);
                res.status(err?.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(new ApiError(err?.statusCode, err?.status, err.message, err.name));
            }
            else {
                logger.error(err?.message);
                logger.error(err?.stack);
                res.status(err?.statusCode ?? StatusCodes.BAD_REQUEST)
                    .send(new ApiError(err?.statusCode, 'ERROR', err.message, err.name));
            }
        }
    };

    public upcoming = async (req: Request, res: Response<ApiResponse<Assignment[]> | ApiError>) => {
        try {

            logger.info(`Get upcoming assignments => ${req?.query?.classId}`);

            const assignments = await this.assignmentService.upcoming(String(req?.query?.classId),res?.locals?.schoolId);
    
            res.status(StatusCodes.OK)
                .send(new ApiResponse(StatusCodes.OK, 'SUCCESS', assignments, 'Upcoming assignments'));

        } catch (err: any) {
            if (err?.status === 'FAILURE') {
                logger.debug(err?.message);
                logger.debug(err?.stack);
                res.status(err?.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(new ApiError(err?.statusCode, err?.status, err.message, err.name));
            }
            else {
                logger.error(err?.message);
                logger.error(err?.stack);
                res.status(err?.statusCode ?? StatusCodes.BAD_REQUEST)
                    .send(new ApiError(err?.statusCode, 'ERROR', err.message, err.name));
            }
        }
    };

    public pending = async (req: Request, res: Response<ApiResponse<Assignment[]> | ApiError>) => {
        try {

            logger.info(`Get pending assignments => ${req?.query?.studentId}`);

            const assignments = await this.assignmentService.pending(String(req?.query?.studentId),res?.locals?.schoolId);
    
            res.status(StatusCodes.OK)
                .send(new ApiResponse(StatusCodes.OK, 'SUCCESS', assignments, 'Pending assignments'));

        } catch (err: any) {
            if (err?.status === 'FAILURE') {
                logger.debug(err?.message);
                logger.debug(err?.stack);
                res.status(err?.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(new ApiError(err?.statusCode, err?.status, err.message, err.name));
            }
            else {
                logger.error(err?.message);
                logger.error(err?.stack);
                res.status(err?.statusCode ?? StatusCodes.BAD_REQUEST)
                    .send(new ApiError(err?.statusCode, 'ERROR', err.message, err.name));
            }
        }
    };

    public submitted = async (req: Request, res: Response<ApiResponse<SubmittedAssignment[]> | ApiError>) => {
        try {

            logger.info(`Get submitted assignments => ${req?.query?.studentId}`);

            const assignments = await this.assignmentService.submitted(String(req?.query?.studentId),res?.locals?.schoolId);
    
            res.status(StatusCodes.OK)
                .send(new ApiResponse(StatusCodes.OK, 'SUCCESS', assignments, 'Submitted assignments'));

        } catch (err: any) {
            if (err?.status === 'FAILURE') {
                logger.debug(err?.message);
                logger.debug(err?.stack);
                res.status(err?.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(new ApiError(err?.statusCode, err?.status, err.message, err.name));
            }
            else {
                logger.error(err?.message);
                logger.error(err?.stack);
                res.status(err?.statusCode ?? StatusCodes.BAD_REQUEST)
                    .send(new ApiError(err?.statusCode, 'ERROR', err.message, err.name));
            }
        }
    };

    public uploaded = async (req: Request, res: Response<ApiResponse<Assignment[]> | ApiError>) => {
        try {

            logger.info(`Get uploaded assignments => ${req?.query?.teacherId}`);

            const assignments = await this.assignmentService.uploaded(String(req?.query?.teacherId),res?.locals?.schoolId);
    
            res.status(StatusCodes.OK)
                .send(new ApiResponse(StatusCodes.OK, 'SUCCESS', assignments, 'Uploaded assignments'));

        } catch (err: any) {
            if (err?.status === 'FAILURE') {
                logger.debug(err?.message);
                logger.debug(err?.stack);
                res.status(err?.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(new ApiError(err?.statusCode, err?.status, err.message, err.name));
            }
            else {
                logger.error(err?.message);
                logger.error(err?.stack);
                res.status(err?.statusCode ?? StatusCodes.BAD_REQUEST)
                    .send(new ApiError(err?.statusCode, 'ERROR', err.message, err.name));
            }
        }
    };

    public delete = async (req: Request, res: Response<ApiResponse<unknown> | ApiError>) => {
        try {

            logger.info(`Delete assignment => ${req?.query?.assignmentId}`);

            const isDeleted = await this.assignmentService.delete(String(req?.query?.assignmentId));
            
            if(isDeleted){
                res.status(StatusCodes.OK)
                    .send(new ApiResponse(StatusCodes.OK, 'SUCCESS', {}, 'Assignment is deleted'));
            }else{
                res.status(StatusCodes.OK)
                    .send(new ApiResponse(StatusCodes.OK, 'FAILURE', {}, 'Assignment could not be deleted'));
            }


        } catch (err: any) {
            if (err?.status === 'FAILURE') {
                logger.debug(err?.message);
                logger.debug(err?.stack);
                res.status(err?.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(new ApiError(err?.statusCode, err?.status, err.message, err.name));
            }
            else {
                logger.error(err?.message);
                logger.error(err?.stack);
                res.status(err?.statusCode ?? StatusCodes.BAD_REQUEST)
                    .send(new ApiError(err?.statusCode, 'ERROR', err.message, err.name));
            }
        }
    };

};