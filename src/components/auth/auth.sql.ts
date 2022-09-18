export class AuthSql {

    public VALIDATE_PASSWORD_FOR_STUDENT = `
        SELECT COUNT(*) AS count
        FROM student s INNER JOIN password p ON s.password_id = p.id
        WHERE s.id = ? AND p.hash = ?;
    `;

    public GET_SALT_FOR_STUDENT = `
        SELECT p.salt AS salt FROM student s 
        INNER JOIN password p ON p.id = s.password_id 
        WHERE s.id = ?;
    `;

    public GET_SALT_FOR_TEACHER = `
        SELECT p.salt AS salt FROM teacher t 
        INNER JOIN password p ON p.id = t.password_id 
        WHERE t.id = ?;
    `;

    public VALIDATE_PASSWORD_FOR_TEACHER = `
        SELECT COUNT(*) AS count
        FROM teacher t INNER JOIN password p ON t.password_id = p.id
        WHERE t.id = ? AND p.hash = ?;
    `;

};