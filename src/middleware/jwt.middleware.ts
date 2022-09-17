import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createLogger from '../lib/logger';
import Environment from '../environments/environment';
import ApiError from '../abstractions/api-error';

const logger = createLogger('JWT Middleware');

const environment = new Environment();

export const authenticateToken = async (req: Request, res: Response<ApiError>, next: NextFunction) => {
    try {

        logger.info('Verify Access Token');

        const accessToken = req.headers['x-access-token'];
        if (!accessToken) {
            res.status(StatusCodes.UNAUTHORIZED)
                .send(new ApiError(StatusCodes.UNAUTHORIZED, 'ERROR', 'Invalid Access Token'));
        } else {

            const payload: any = jwt.verify(String(accessToken), Buffer.from(String(environment.jwtSecretToken)));

            const { userId, schoolId } = payload;
            res.locals.userId = userId;
            res.locals.schoolId = schoolId;


            if (userId && schoolId) {
                logger.info('Access Token Verified');
                next();
            } else {
                res.status(StatusCodes.UNAUTHORIZED)
                    .send(new ApiError(StatusCodes.UNAUTHORIZED, 'ERROR', 'Invalid Access Token'));
            }
        }

    } catch (err) {

        res.status(StatusCodes.UNAUTHORIZED)
            .send(new ApiError(StatusCodes.UNAUTHORIZED, 'ERROR', 'Invalid Access Token'));
    }
};