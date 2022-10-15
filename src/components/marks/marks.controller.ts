import { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createLogger from '../../lib/logger';
import BaseApi from '../base-api';
import ApiResponse from '../../abstractions/api-responses';
import ApiError from '../../abstractions/api-error';
import { authenticateToken } from '../../middleware/jwt.middleware';
import { MarksService } from './marks.service';
import Marks from './marks.model';

const logger = createLogger('Marks Controller');

export default class MarksController extends BaseApi {
    
    constructor(express: Application, private marksService = new MarksService()) {
        super();
        this.register(express);
        if (process.env.pm_id === '0') logger.info(`Registering ${JSON.stringify(logger.defaultMeta?.service)}`);
    }


    public register(express: Application): void {
        express.use('/marks', this.router);
        this.router.get('/get', authenticateToken, this.get);

    }

    public get = async (req: Request, res: Response<ApiResponse<Marks[]> | ApiError>) => {
        try {

            logger.info('Get marks');

            const marks = await this.marksService.get(String(req?.query?.studentId),res?.locals?.schoolId);
    
            res.status(StatusCodes.OK)
                .send(new ApiResponse(StatusCodes.OK, 'SUCCESS', marks, 'Student marks for all exams and subjects'));

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