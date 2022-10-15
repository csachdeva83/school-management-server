import * as express from 'express';
import AssignmentController from './components/assignment/assignment.controller';
import AuthController from './components/auth/auth.controller';
import StudentController from './components/student/student.controller';
import TeacherController from './components/teacher/teacher.controller';
import TimeTableController from './components/time-table/time-table.controller';

export default function registerRoutes(app: express.Application): void {
    new StudentController(app);
    new TeacherController(app);
    new AuthController(app);
    new AssignmentController(app);
    new TimeTableController(app);
}
