import createLogger from '../../lib/logger';
import { AttendanceRepositry } from './attendance.repositry';

const logger = createLogger('Attendance Service');

export class AttendanceService {

    constructor(private attendanceRepositry = new AttendanceRepositry()) {}

    // get present and absent percentage
    public async get(studentId: string): Promise<{presentPercentage: number, absentPercentage: number}> {
        logger.info(`Get absent and present percentage for  => ${studentId}`);
        
        const presentCount = await this.attendanceRepositry.getPresentCount(studentId);
        const absentCount = await this.attendanceRepositry.getAbsentCount(studentId);
        const totalCount = await this.attendanceRepositry.getTotalCount(studentId);

        return {
            presentPercentage: (presentCount*100)/totalCount,
            absentPercentage: (absentCount*100)/totalCount,
        };
    }

}