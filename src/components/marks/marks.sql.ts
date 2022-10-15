export class MarksSql {
    public GET_MARKS = `
        SELECT s.name,sem.UT1, sem.UT2, sem.MidTerm, sem.UT3, sem.UT4, sem.Preboard1, sem.Preboard2  FROM student_exam_marks sem 
        INNER JOIN subject s ON sem.subject_id = s.id ; 
    `;
}