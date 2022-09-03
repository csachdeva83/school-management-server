import { transformAndValidate } from 'class-transformer-validator';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const isProd = process.env.NODE_ENV === 'production';

function makeValidateBody<T>(c: T, errorHandler?: (err: any, req: Request, res: Response, next: NextFunction) => void, whitelist = true,) {
    return function ExpressClassValidate(req: Request, res: Response, next: NextFunction) {
        const toValidate = req.body;
        if (!toValidate) {
            if (errorHandler) {
                errorHandler({
                    type: 'no-body'
                }, req, res, next);
            } else {
                res.status(400).json({
                    status: 'ERROR',
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: 'Model validation failed',
                    ...(isProd
                        ? {
                        }
                        : {
                            validationError: {
                                message: 'No request body found'
                            }
                        }
                    ),
                    name: 'ValidationError'
                });
            }
        } else {
            transformAndValidate(c as any, toValidate, {
                validator: {
                    whitelist
                }
            })
                .then(transformed => {
                    req.body = transformed;
                    next();
                })
                .catch(err => {
                    if (errorHandler) {
                        errorHandler(err, req, res, next);
                    } else {
                        res.status(400).json({
                            status: 'ERROR',
                            statusCode: StatusCodes.BAD_REQUEST,
                            message: 'Model validation failed',
                            ...(isProd
                                ? {
                                }
                                : {
                                    validationError: err
                                }
                            ),
                            name: 'ValidationError'
                        });
                    }
                });
        }
    };
}

export default makeValidateBody;