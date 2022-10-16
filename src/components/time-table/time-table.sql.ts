export class TimeTableSql {
    public GET_TIMETABLE = `
        SELECT t.day,1st_period AS firstPeriod, 2nd_period AS secondPeriod, 3rd_period AS thirdPeriod, 4th_period AS fourthPeriod, 5th_period AS fifthPeriod, 6th_period AS sixthPeriod, 7th_period AS seventhPeriod, 8th_period AS eigthPeriod 
        FROM timetable t WHERE t.school_id = ? AND t.class_id = ?;
    `;

    public GET_TODAY_TIMETABLE = `
        SELECT t.day, 1st_period AS firstPeriod, 2nd_period AS secondPeriod, 3rd_period AS thirdPeriod, 4th_period AS fourthPeriod, 5th_period AS fifthPeriod, 6th_period AS sixthPeriod, 7th_period AS seventhPeriod, 8th_period AS eigthPeriod 
        FROM timetable t 
        WHERE t.day = DAYNAME(CURRENT_DATE()) AND t.school_id = ? AND t.class_id = ?;
    `;

    public GET_SUBJECT_TEACHER = `
    SELECT JSON_OBJECT(
        cstm.subject,
        JSON_OBJECT(
            'teacherImgLink',
            t.image_link,
            'teacherName',
            CONCAT( t.first_name , " ", t.last_name )
        )
    ) AS result FROM class_subject_teacher_mapping cstm
    INNER JOIN teacher t ON t.id = cstm.teacher_id 
    WHERE cstm.class_id = ? AND cstm.school_id = ? ; 
    `;
}