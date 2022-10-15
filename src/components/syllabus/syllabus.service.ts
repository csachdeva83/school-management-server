import createLogger from '../../lib/logger';
import { Syllabus } from './syllabus.model';
import { SyllabusRepositry } from './syllabus.reposirty';

const logger = createLogger('Syllabus Service');

export class SyllabusService {

    constructor(private syllabusRepositry = new SyllabusRepositry()) {}

    // get syllabus
    public async get(classId: string, schoolId: number): Promise<Syllabus[]> {
        logger.info(`Get syllabus for  => ${classId}`);
        
        const syllabus = await this.syllabusRepositry.get(classId, schoolId);
        
        return syllabus;
    }


}