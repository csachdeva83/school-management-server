import * as express from 'express';
import AssignmentController from './components/assignment/assignment.controller';
import AttendanceController from './components/attendance/attendance.controller';
import AuthController from './components/auth/auth.controller';
import CircularController from './components/circular/circular.controller';
import MarksController from './components/marks/marks.controller';
import StudentController from './components/student/student.controller';
import SyllabusController from './components/syllabus/syllabus.controller';
import TeacherController from './components/teacher/teacher.controller';
import TimeTableController from './components/time-table/time-table.controller';

export default function registerRoutes(app: express.Application): void {
    new StudentController(app);
    new TeacherController(app);
    new AuthController(app);
    new AssignmentController(app);
    new TimeTableController(app);
    new SyllabusController(app);
    new MarksController(app);
    new AttendanceController(app);
    new CircularController(app);
}
