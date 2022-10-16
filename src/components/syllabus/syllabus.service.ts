import createLogger from '../../lib/logger';
import { TSyllabus } from './syllabus.types';
import { SyllabusRepositry } from './syllabus.reposirty';

const logger = createLogger('Syllabus Service');

export class SyllabusService {

    constructor(private syllabusRepositry = new SyllabusRepositry()) {}

    // get syllabus
    public async get(classId: string, schoolId: number): Promise<TSyllabus[]> {
        logger.info(`Get syllabus for  => ${classId}`);
        
        const syllabus = await this.syllabusRepositry.get(classId, schoolId);
        
        return syllabus;
    }


}