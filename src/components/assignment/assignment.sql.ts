export class AssignmentSql {
    
    public UPLOAD_STUDENT_MARKS_FOR_ASSIGNMENT = `
        INSERT INTO student_assignment_marks(assignment_id,marks_obtained,status,student_id) 
        VALUES(?,?,?,?) AS new on DUPLICATE KEY UPDATE marks_obtained=new.marks_obtained, status=new.status;
    `;

    public UPLOAD_ASSIGNMENT = `
        INSERT INTO assignments(class_id,pdf_link,submission_date,teacher_id,title,total_marks,school_id) 
        VALUES(?,?,?,?,?,?,?);
    `;

    public GET_UPCOMING_ASSIGNMENTS = `
        SELECT title, class_id AS classId, pdf_link AS pdfLink, total_marks AS totalMarks, submission_date AS submissionDate
        FROM assignments WHERE class_id = ? AND school_id = ? AND submission_date>CURRENT_DATE();
    `;

    public GET_PENDING_ASSIGNMENTS = `
        SELECT a.title, a.class_id AS classId, a.pdf_link AS pdfLink, a.total_marks AS totalMarks, a.submission_date AS submissionDate FROM assignments a 
        INNER JOIN student s ON s.class_id = a.class_id 
        WHERE a.submission_date < CURRENT_DATE() AND a.school_id = ? AND s.id = ? AND a.id NOT IN (SELECT sam.assignment_id FROM student_assignment_marks sam WHERE sam.student_id = ?);
    `;

    public GET_SUBMITTED_ASSIGNMENTS = `
        SELECT st.name AS subject, a.title, CONCAT(t.first_name," ",t.last_name) AS teacherName, t.image_link AS teacherImageLink, sam.status, sam.marks_obtained as marksObtained FROM student_assignment_marks sam 
        INNER JOIN assignments a ON a.id  = sam.assignment_id 
        INNER JOIN teacher t ON t.id = a.teacher_id 
        INNER JOIN subject st ON JSON_EXTRACT(t.subject_ids,'$[0]') = st.id
        WHERE sam.student_id = ? AND a.school_id = ?
        ORDER BY a.submission_date ;
    `;

    public GET_UPLOADED_ASSIGNMENTS = `
        SELECT a.id, a.title, a.class_id AS classId, a.pdf_link AS pdfLink, a.total_marks AS totalMarks, a.submission_date AS submissionDate FROM assignments a 
        WHERE a.teacher_id = ? AND a.school_id = ?
        ORDER BY a.created_at; 
    `;

    public DELETE_ASSIGNMENT = `
        DELETE FROM assignments WHERE id = ?;
    `;

}