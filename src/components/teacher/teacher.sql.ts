export class TeacherSql {

    public GET_TEACHER_DETAILS_BY_ID = `
        SELECT t.first_name as firstName, t.last_name as lastName, t.birthdate , t.phone as phoneNumber,t.email ,t.image_link as imageLink, st.name AS subjectName
        FROM teacher t
        INNER JOIN subject st ON t.subject_id = st.id
        WHERE t.id = ?;
    `;

    public CREATE_PASSWORD = `
        INSERT INTO password(salt,hash)
        VALUES(?,?);
    `;

    public CREATE_TEACHER = `
        INSERT INTO teacher (
            id,
            first_name,
            last_name,
            birthDate,
            phone, 
            email,
            subject_ids,
            password_id, 
            image_link, 
            school_id)
        VALUES (?,?,?,?,?,?,?,?,?,?);
    `;

    public GET_NEW_TEACHER_ID = `
        (SELECT IFNULL
            (CONCAT('TR',LPAD(
            (SUBSTRING_INDEX
            (MAX(id), 'TR',-1) + 1), 3, '0')), 'TR001')
        AS 'idNumber' FROM teacher t ORDER BY id ASC);
    `;
}