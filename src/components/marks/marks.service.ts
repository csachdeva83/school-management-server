import createLogger from '../../lib/logger';
import Marks, { MarksPerformacePercentage } from './marks.model';
import { MarksRepositry } from './marks.reposirty';

const logger = createLogger('Marks Service');

export class MarksService {

    constructor(private marksRepositry = new MarksRepositry()) {}

    // get marks
    public async get(studentId: string, schoolId: number): Promise<Marks[]> {
        logger.info(`Get marks for  => ${studentId}`);
        
        const marks = await this.marksRepositry.get(studentId, schoolId);
        
        return marks;
    }

    // get performance percentage as per exams
    public async getPerformancePercentage(studentId: string, schoolId: number): Promise<MarksPerformacePercentage[]> {
        logger.info(`Get performance percentage for  => ${studentId}`);
        
        const marks = await this.marksRepositry.getPerformancePercentage(studentId, schoolId);
        
        return marks;
    }


}