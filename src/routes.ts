import * as express from 'express';
import AuthController from './components/auth/auth.controller';
import StudentController from './components/student/student.controller';

export default function registerRoutes(app: express.Application): void {
    new StudentController(app);
    new AuthController(app);
}
