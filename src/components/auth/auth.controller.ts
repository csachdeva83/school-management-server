import { Application, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import makeValidateBody from '../../middleware/request-body-validator';
import createLogger from '../../lib/logger';
import BaseApi from '../base-api';
import CustomRequest from '../../abstractions/custom-request';
import ApiResponse from '../../abstractions/api-responses';
import ApiError from '../../abstractions/api-error';
import AuthLogin from './request/login-auth.request';
import { AuthService } from './auth.service';
import Auth from './auth.model';
import { StudentService } from '../student/student.service';

const logger = createLogger('Student Controller');


export default class AuthController extends BaseApi {

    constructor(express: Application, private authService = new AuthService(), private studentService = new StudentService()) {
        super();
        this.register(express);
        if (process.env.pm_id === '0') logger.info(`Registering ${JSON.stringify(logger.defaultMeta?.service)}`);
    }


    public register(express: Application): void {
        express.use('/auth', this.router);
        this.router.post('/login', makeValidateBody(AuthLogin), this.authenticateUser);
    }

    /**
     * Create new student 
     * 
     * @api {post} /student/create 
     * @apiParamExample (Request body) {json} Input
     * {
     *      "email" : "harry@yahoo.com",
     *      "password": "11223344"
     * }
     * @apiSuccessExample {json} Success
     *   {
     *       statusCode: 200,
     *       status : SUCCESS,
     *       data: {
     *          "id":1,  
     *          "firstName" : "Harry",
     *          "lastName" : "Potter",
     *          "birthDate" : "2002-16-09",
     *          "phoneNumber" : "+14084991635",
     *          "email" : "harry@yahoo.com",
     *          "classId": "11D",
     *       },
     *       message: User authenticated successfully  
     *   }
     *  
     * @apiErrorExample {json} Failure
     *  {
     *       status: ERROR || FAILURE,
     *       statusCode: INTERNAL_SERVER_ERROR || BAD_REQUEST,
     *       name: Error || ApiError,
     *       message: err.message || Email id or password is invalid || Could not fetch account details
     *   }
     */
    public authenticateUser = async (req: CustomRequest<AuthLogin>, res: Response<ApiResponse<Auth> | ApiError>) => {
        try {

            logger.info('Authenticating user');

            const isUserAuthenticated = await this.authService.authenticateUser(req?.body);
            if (isUserAuthenticated) {

                const getStudentDetailsbyEmailId = await this.studentService.get({ emailId: req?.body?.email });

                if (getStudentDetailsbyEmailId) {

                    res.status(StatusCodes.OK)
                        .send(new ApiResponse(StatusCodes.OK, 'SUCCESS', getStudentDetailsbyEmailId, 'User authenticated successfully'));
                } else {
                    res.status(StatusCodes.EXPECTATION_FAILED)
                        .send(new ApiError(StatusCodes.EXPECTATION_FAILED, 'FAILURE', 'Could not fetch account details'));
                }
            }
            else {
                res.status(StatusCodes.EXPECTATION_FAILED)
                    .send(new ApiError(StatusCodes.EXPECTATION_FAILED, 'FAILURE', 'Email id or password is invalid'));
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