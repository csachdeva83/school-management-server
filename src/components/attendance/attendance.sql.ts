export class AttendanceSql {
    public GET_PRESENT_COUNT = `
        SELECT COUNT(present) AS present FROM student_attendance sa WHERE sa.present = 1 AND sa.student_id = ?;
    `;

    public GET_ABSENT_COUNT = `
        SELECT COUNT(present) AS absent FROM student_attendance sa WHERE sa.present = 0 AND sa.student_id = ?;
    `;

    public GET_TOTAL_COUNT = `
        SELECT COUNT(student_id) AS total FROM student_attendance sa WHERE sa.student_id = ?;
    `;
}