import { Application, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import makeValidateBody from '../../middleware/request-body-validator';
import createLogger from '../../lib/logger';
import BaseApi from '../base-api';
import AuthLogin from './request/login.request';
import CustomRequest from '../../abstractions/custom-request';
import ApiResponse from '../../abstractions/api-responses';
import ApiError from '../../abstractions/api-error';
import AuthService from './auth.service';
import { createToken } from '../jwt/jwt.service';
import { UserBody } from './auth.types';

const logger = createLogger('Auth Controller');

export default class AuthController extends BaseApi{

    constructor(express: Application, private authService = new AuthService()) {
        super();
        this.register(express);
        if (process.env.pm_id === '0') logger.info(`Registering ${JSON.stringify(logger.defaultMeta?.service)}`);
    }

    public register(express: Application): void {
        express.use('/auth', this.router);
        this.router.post('/login', makeValidateBody(AuthLogin), this.authenticateUser);
    }

    public authenticateUser = async (req: CustomRequest<AuthLogin>, res: Response<ApiResponse<UserBody> | ApiError>) => {
        try {

            logger.info('Authenticate User');

            const userDetails = await this.authService.authenticateUser(req?.body);

            if (userDetails) {

                const token = await createToken(req?.body?.schoolId, req?.body?.userId);

                res.status(StatusCodes.OK)
                    .send(new ApiResponse(StatusCodes.OK, 'SUCCESS', {
                        ...userDetails, token
                    }, 'User logged in successfully'));
            }
            else {
                res.status(StatusCodes.EXPECTATION_FAILED)
                    .send(new ApiError(StatusCodes.EXPECTATION_FAILED, 'ERROR', 'Bad Credentials'));
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