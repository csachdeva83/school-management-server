import { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import makeValidateBody from '../../middleware/request-body-validator';
import createLogger from '../../lib/logger';
import BaseApi from '../base-api';
import CreateTeacher from './request/create-teacher.request';
import CustomRequest from '../../abstractions/custom-request';
import ApiResponse from '../../abstractions/api-responses';
import Teacher from './teacher.model';
import ApiError from '../../abstractions/api-error';
import { TeacherService } from './teacher.service';

const logger = createLogger('Teacher Controller');

export default class TeacherController extends BaseApi {
    
    constructor(express: Application, private teacherService = new TeacherService()) {
        super();
        this.register(express);
        if (process.env.pm_id === '0') logger.info(`Registering ${JSON.stringify(logger.defaultMeta?.service)}`);
    }


    public register(express: Application): void {
        express.use('/teacher', this.router);
        this.router.post('/create', makeValidateBody(CreateTeacher), this.createTeacher);
        this.router.get('/get', this.getTeacher);
    }

    /**
     * Create new teacher 
     * 
     * @api {post} /teacher/create 
     * @apiParamExample (Request body) {json} Input
     *   {
     *       "id": null,
     *       "firstName" : "Anil",
     *       "lastName" : "Batra",
     *       "birthDate" : "1975-03-06",
     *       "phoneNumber" : "+14084991635",
     *       "email" : "AnilBat@gmail.com",
     *       "subjectName": "Physics", 
     *       "password": "11223344",
     *       "passwordId": null,
     *       "imageLink": "shorturl.at/abT69",
     *       "schoolId": 1,
     *       "subjectIds": [1,5]
     *   }
     * @apiSuccessExample {json} Success
     *   {
     *       "statusCode": 200,
     *       "status": "SUCCESS",
     *       "data": {
     *           "firstName": "Anil",
     *           "lastName": "Batra",
     *           "birthDate": "1975-03-06",
     *           "email": "AnilBat@gmail.com",
     *           "phoneNumber": "+14084991635",
     *           "subjectName": "Physics",
     *           "imageLink": "shorturl.at/abT69"
     *       },
     *       "message": "Teacher created successfully"
     *   }
     *  
     * @apiErrorExample {json} Failure
     *  {
     *       status: ERROR || FAILURE,
     *       statusCode: INTERNAL_SERVER_ERROR || BAD_REQUEST,
     *       name: Error || ApiError,
     *       message: err.message || Teacher could not be created
     *   }
     */
    public createTeacher = async (req: CustomRequest<CreateTeacher>, res: Response<ApiResponse<Teacher> | ApiError>) => {
        try {

            logger.info('Create a new teacher');

            const isCreated = await this.teacherService.create(req?.body);
            if (isCreated) {
                const newTeacher = new Teacher();
                newTeacher.firstName = req?.body?.firstName;
                newTeacher.lastName = req?.body?.lastName;
                newTeacher.birthDate = req?.body?.birthDate;
                newTeacher.email = req?.body?.email;
                newTeacher.phoneNumber = req?.body?.phoneNumber;
                newTeacher.subjectName = req?.body?.subjectName;
                newTeacher.imageLink = req.body?.imageLink;

                res.status(StatusCodes.OK)
                    .send(new ApiResponse(StatusCodes.OK, 'SUCCESS', newTeacher, 'Teacher created successfully'));
            }
            else {
                res.status(StatusCodes.EXPECTATION_FAILED)
                    .send(new ApiError(StatusCodes.EXPECTATION_FAILED, 'FAILURE', 'Teacher could not be created'));
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

    /**
     * Get teacher 
     * 
     * @api {post} /teacher/get 
     * @apiParamExample (Request query) teacherId number
     * @apiSuccessExample {json} Success
     *   {
     *       "statusCode": 200,
     *       "status": "SUCCESS",
     *       "data": {
     *           "firstName": "Anil",
     *           "lastName": "Batra",
     *           "birthDate": "1975-03-06",
     *           "email": "AnilBat@gmail.com",
     *           "phoneNumber": "+14084991635",
     *           "subjectName": "Physics",
     *           "imageLink": "shorturl.at/abT69"
     *       },
     *       "message": "Get teacher successfully"
     *   }
     *  
     * @apiErrorExample {json} Failure
     *  {
     *       status: ERROR || FAILURE,
     *       statusCode: INTERNAL_SERVER_ERROR || BAD_REQUEST,
     *       name: Error || ApiError,
     *       message: err.message
     *   }
     */
    public getTeacher = async (req: Request, res: Response<ApiResponse<Teacher> | ApiError>) => {
        try {

            logger.info(`Get teacher => ${req?.query?.teacherId}`);

            const teacher = await this.teacherService.getById(String(req?.query?.teacherId));
    
            res.status(StatusCodes.OK)
                .send(new ApiResponse(StatusCodes.OK, 'SUCCESS', teacher, 'Get teacher successfully'));

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