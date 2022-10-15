export class SyllabusSql {
    public GET_SYLLABUS = `
        SELECT JSON_OBJECT(s.exam, JSON_ARRAYAGG(
            JSON_OBJECT( s.name, s.syllabus_link )
            )
        ) AS result FROM subject s 
        WHERE s.class_id = ? AND s.school_id = ?
        GROUP BY s.exam ;
    `;
}