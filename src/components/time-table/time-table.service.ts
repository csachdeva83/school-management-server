import createLogger from '../../lib/logger';
import TimeTable from './time-table.model';
import { TimeTableRepositry } from './time-table.repositry';
import { ITodayTimetable } from './time-table.types';

const logger = createLogger('TimeTable Service');

export class TimeTableService {

    constructor(private timeTableRepositry = new TimeTableRepositry()) {}

    // get time table
    public async get(classId: string, schoolId: number): Promise<TimeTable[]> {
        logger.info(`Get time table for  => ${classId}`);
        
        const timeTable = await this.timeTableRepositry.get(classId, schoolId);
        
        return timeTable;
    }

    public async getToday(classId: string, schoolId: number): Promise<ITodayTimetable> {
        logger.info(`Get today's time table for  => ${classId}`);
        
        const todayTimeTable = await this.timeTableRepositry.getToday(classId, schoolId);
        const teacherSubjectMapping = await this.timeTableRepositry.getSubjectTeacherMapping(classId, schoolId);

        const timeTable = {
            firstPeriod: {
                subject: todayTimeTable.firstPeriod,
                ...teacherSubjectMapping.filter( (obj) => obj[todayTimeTable.firstPeriod] )[0]?.[todayTimeTable.firstPeriod]
            },
            secondPeriod: {
                subject: todayTimeTable.secondPeriod,
                ...teacherSubjectMapping.filter( (obj) => obj[todayTimeTable.secondPeriod] )[0]?.[todayTimeTable.secondPeriod]
            },   
            thirdPeriod: {
                subject: todayTimeTable.thirdPeriod,
                ...teacherSubjectMapping.filter( (obj) => obj[todayTimeTable.thirdPeriod] )[0]?.[todayTimeTable.thirdPeriod]
            },
            fourthPeriod: {
                subject: todayTimeTable.fourthPeriod,
                ...teacherSubjectMapping.filter( (obj) => obj[todayTimeTable.fourthPeriod] )[0]?.[todayTimeTable.fourthPeriod]
            },
            fifthPeriod: {
                subject: todayTimeTable.fifthPeriod,
                ...teacherSubjectMapping.filter( (obj) => obj[todayTimeTable.fifthPeriod] )[0]?.[todayTimeTable.fifthPeriod]
            },
            sixthPeriod: {
                subject: todayTimeTable.sixthPeriod,
                ...teacherSubjectMapping.filter( (obj) => obj[todayTimeTable.sixthPeriod] )[0]?.[todayTimeTable.sixthPeriod]
            },
            seventhPeriod: {
                subject: todayTimeTable.seventhPeriod,
                ...teacherSubjectMapping.filter( (obj) => obj[todayTimeTable.seventhPeriod] )[0]?.[todayTimeTable.seventhPeriod]
            },
            eigthPeriod: {
                subject: todayTimeTable.eigthPeriod,
                ...teacherSubjectMapping.filter( (obj) => obj[todayTimeTable.eigthPeriod] )[0]?.[todayTimeTable.eigthPeriod]
            }, 
        };
        
        return timeTable;
    }


}