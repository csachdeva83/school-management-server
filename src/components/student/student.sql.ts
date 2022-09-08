export class StudentSql {
    
    public CREATE_STUDENT = `
        INSERT INTO student(first_name, last_name, birthdate, phone, email, class_id, password_id) 
        VALUES(?,?,?,?,?,?,?);
    `;

    public CREATE_PASSWORD = `
        INSERT INTO password(salt,hash)
        VALUES(?,?);
    `;
}