import * as express from 'express';
import AuthController from './components/auth/auth.controller';
import StudentController from './components/student/student.controller';
import TeacherController from './components/teacher/teacher.controller';

export default function registerRoutes(app: express.Application): void {
    new StudentController(app);
    new TeacherController(app);
    new AuthController(app);
}
