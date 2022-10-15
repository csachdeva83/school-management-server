export class TimeTableSql {
    public GET_TIMETABLE = `
        SELECT t.day,1st_period AS firstPeriod, 2nd_period AS secondPeriod, 3rd_period AS thirdPeriod, 4th_period AS fourthPeriod, 5th_period AS fifthPeriod, 6th_period AS sixthPeriod, 7th_period AS seventhPeriod, 8th_period AS eigthPeriod 
        FROM timetable t WHERE t.school_id = ? AND t.class_id = ?;
    `;
}