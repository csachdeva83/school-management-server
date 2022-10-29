import { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createLogger from '../../lib/logger';
import BaseApi from '../base-api';
import ApiResponse from '../../abstractions/api-responses';
import ApiError from '../../abstractions/api-error';
import { authenticateToken } from '../../middleware/jwt.middleware';
import { TimeTableService } from './time-table.service';
import TimeTable from './time-table.model';
import { ITodayTimetable } from './time-table.types';

const logger = createLogger('TimeTable Controller');

export default class TimeTableController extends BaseApi {
    
    constructor(express: Application, private timeTableService = new TimeTableService()) {
        super();
        this.register(express);
        if (process.env.pm_id === '0') logger.info(`Registering ${JSON.stringify(logger.defaultMeta?.service)}`);
    }


    public register(express: Application): void {
        express.use('/time-table', this.router);
        this.router.get('/get', authenticateToken, this.get);
        this.router.get('/get-today', authenticateToken, this.getToday);


    }

    public get = async (req: Request, res: Response<ApiResponse<TimeTable[]> | ApiError>) => {
        try {

            logger.info('Get time table');

            const timeTable = await this.timeTableService.get(String(req?.query?.classId),res?.locals?.schoolId);
    
            res.status(StatusCodes.OK)
                .send(new ApiResponse(StatusCodes.OK, 'SUCCESS', timeTable, 'Time Table fetched successfully'));

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

    public getToday = async (req: Request, res: Response<ApiResponse<ITodayTimetable> | ApiError>) => {
        try {

            logger.info('Get time table for today');

            const timetable = await this.timeTableService.getToday(String(req?.query?.classId),res?.locals?.schoolId);
    
            res.status(StatusCodes.OK)
                .send(new ApiResponse(StatusCodes.OK, 'SUCCESS', timetable, 'Time Table fetched successfully'));

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