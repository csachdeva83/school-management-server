export class AuthSql {
    
    public GET_SALT_AND_HASH_BY_EMAIL_ID = `
    SELECT p.salt,p.hash FROM student s 
    INNER JOIN password p ON p.id = s.password_id 
    WHERE s.email = ?
    `;

  
}