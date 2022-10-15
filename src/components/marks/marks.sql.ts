export class MarksSql {
    public GET_MARKS = `
        SELECT s.name,sem.UT1, sem.UT2, sem.MidTerm, sem.UT3, sem.UT4, sem.Preboard1, sem.Preboard2  FROM student_exam_marks sem 
        INNER JOIN subject s ON sem.subject_id = s.id WHERE sem.student_Id = ? AND sem.school_Id = ?; 
    `;

    public GET_PERFORMANCE_PERCENTAGE = `
        SELECT ROUND((SUM(UT1)*100)/150,0) AS UT1, ROUND((SUM(UT2)*100)/150,0) AS UT2, ROUND((SUM(MidTerm)*100)/250,0) AS MidTerm, ROUND((SUM(UT3)*100)/150,0) AS UT3, ROUND((SUM(UT4)*100)/150,0) AS UT4, ROUND((SUM(Preboard1)*100)/500,0) AS Preboard1, ROUND((SUM(Preboard2)*100)/500,0) AS Preboard2 FROM student_exam_marks sem 
        WHERE sem.student_id = ? AND sem.school_id = ?
        GROUP BY sem.UT1, sem.UT2, sem.MidTerm, sem.UT3, sem.UT4, sem.Preboard1, sem.Preboard2  ; 
    `;
}