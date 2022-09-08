import { Request } from 'express';

interface CustomRequest<T> extends Request {
    body: T;
};

export default CustomRequest;