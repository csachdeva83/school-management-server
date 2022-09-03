import { StatusCodes } from 'http-status-codes';

interface IStandardResponseBody<T> {
    status: string;
    statusCode: StatusCodes;
    data?: T;
    message?: string;
}

export class ApiResponse<T> implements IStandardResponseBody<T>{
    status: string;

    statusCode: StatusCodes;

    data?: T;

    message?: string;

    constructor(statusCode: StatusCodes, status: string, data: T, message: string = '') {
        this.statusCode = statusCode;
        this.status = status;
        this.data = data;
        this.message = message;
    }
}

export default ApiResponse;