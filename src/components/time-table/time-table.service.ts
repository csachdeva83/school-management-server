import createLogger from '../../lib/logger';
import TimeTable from './time-table.model';
import { TimeTableRepositry } from './time-table.reposirty';

const logger = createLogger('TimeTable Service');

export class TimeTableService {

    constructor(private timeTableRepositry = new TimeTableRepositry()) {}

    // get time table
    public async get(classId: string, schoolId: number): Promise<TimeTable[]> {
        logger.info(`Get time table for  => ${classId}`);
        
        const timeTable = await this.timeTableRepositry.get(classId, schoolId);
        
        return timeTable;
    }


}