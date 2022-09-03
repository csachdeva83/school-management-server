import { StatusCodes } from 'http-status-codes';

export interface IError {
    status: string;
    statusCode: StatusCodes;
    message: string;
    name: string;
    validationError?: any;
}

class ApiError extends Error implements IError {

    public status = 'ERROR';

    public statusCode = StatusCodes.BAD_REQUEST;

    constructor(statusCode: StatusCodes | undefined, status: string, msg: string, name: string = 'ApiError') {
        super();
        this.message = msg;
        this.status = status;
        this.statusCode = statusCode || StatusCodes.BAD_REQUEST;
        this.name = name;
    }
}

export default ApiError;
