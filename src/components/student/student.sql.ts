export class StudentSql {

    public CREATE_STUDENT = `
        INSERT INTO student(first_name, last_name, birthdate, phone, email, class_id, password_id) 
        VALUES(?,?,?,?,?,?,?);
    `;

    public CREATE_PASSWORD = `
        INSERT INTO password(salt,hash)
        VALUES(?,?);
    `;

    public GET_STUDENT_DETAILS_BY_EMAIL_ID = `
    SELECT s.first_name as firstName, s.last_name as lastName, s.birthdate , s.phone as phoneNumber,s.email ,s.class_id as classId FROM student s 
    WHERE s.email = ?;
    `;
};