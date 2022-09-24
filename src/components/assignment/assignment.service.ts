import createLogger from '../../lib/logger';
import Assignment from './assignment.model';
import { AssignmentRepositry } from './assignment.repositry';
import CreateAssignment from './request/create-assignment.request';
import SubmitAssignmentMarks from './request/submit-assignment-marks.request';
import SubmittedAssignment from './submitted-assignment.model';

const logger = createLogger('Assignment Service');

export class AssignmentService {

    constructor(private assignmentRepositry = new AssignmentRepositry()) {}

    // upload assignment
    public async upload(assignment: CreateAssignment, schoolId: number): Promise<boolean> {
        logger.info(`Upload a new assignment => ${JSON.stringify(assignment)}`);
        
        const isUploaded = await this.assignmentRepositry.upload(assignment, schoolId);
        
        return isUploaded;
    }

    // upload student marks for student
    public async uploadMarks(body: SubmitAssignmentMarks): Promise<boolean> {
        logger.info(`Upload student assignment marks => ${JSON.stringify(body)}`);
        
        const isUploaded = await this.assignmentRepositry.uploadMarks(body);
        
        return isUploaded;
    }

    // get upcoming assignments
    public async upcoming(classId: string, schoolId: number): Promise<Assignment[]> {
        logger.info(`Get upcoming assignments for  => ${classId}`);
        
        const assignments = await this.assignmentRepositry.upcoming(classId, schoolId);
        
        return assignments;
    }

    // get pending assignments
    public async pending(studentId: string, schoolId: number): Promise<Assignment[]> {
        logger.info(`Get pending assignments for  => ${studentId}`);
        
        const assignments = await this.assignmentRepositry.pending(studentId, schoolId);
        
        return assignments;
    }

    // get submitted assignments
    public async submitted(studentId: string, schoolId: number): Promise<SubmittedAssignment[]> {
        logger.info(`Get submitted assignments for  => ${studentId}`);
        
        const assignments = await this.assignmentRepositry.submitted(studentId, schoolId);
        
        return assignments;
    }

    // get uploaded assignments
    public async uploaded(teacherId: string, schoolId: number): Promise<Assignment[]> {
        logger.info(`Get uploaded assignments for  => ${teacherId}`);
        
        const assignments = await this.assignmentRepositry.uploaded(teacherId, schoolId);
        
        return assignments;
    }

    // delete assignment
    public async delete(assignmentId: string): Promise<boolean> {
        logger.info(`Delete assignment => ${assignmentId}`);
        
        const isDeleted = await this.assignmentRepositry.delete(assignmentId);
        
        return isDeleted;
    }

}