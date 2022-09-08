import * as express from 'express';
import StudentController from './components/student/student.controller';

export default function registerRoutes(app: express.Application): void {
    new StudentController(app);
}
