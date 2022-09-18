export class StudentSql {
    
    public CREATE_STUDENT = `
        INSERT INTO student(id,first_name, last_name, birthdate, phone, email, class_id, password_id, image_link, school_id) 
        VALUES(?,?,?,?,?,?,?,?,?,?);
    `;

    public CREATE_PASSWORD = `
        INSERT INTO password(salt,hash)
        VALUES(?,?);
    `;

    public GET_STUDENT_DETAILS_BY_ID = `
        SELECT s.first_name as firstName, s.last_name as lastName, s.birthdate , s.phone as phoneNumber,s.email ,s.class_id as classId, s.image_link AS imageLink FROM student s 
        WHERE s.id = ?;
    `;

    public GET_NEW_STUDENT_ID = `
        (SELECT IFNULL
            (CONCAT('ST',LPAD(
            (SUBSTRING_INDEX
            (MAX(id), 'ST',-1) + 1), 3, '0')), 'ST001')
        AS 'idNumber' FROM student s ORDER BY id ASC);
    `;
}