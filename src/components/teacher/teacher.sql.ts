export class TeacherSql {

    public GET_TEACHER_DETAILS_BY_ID = `
        SELECT t.first_name as firstName, t.last_name as lastName, t.birthdate , t.phone as phoneNumber,t.email ,t.image_link as imageLink, st.name AS subjectName
        FROM teacher t
        INNER JOIN subject st ON t.subject_id = st.id
        WHERE t.id = ?;
    `;
}