import { IsPhoneNumber, IsEmail, IsOptional } from 'class-validator';

export default class Teacher {
    
    public firstName: string;

    public lastName: string;

    public birthDate: string;

    @IsPhoneNumber()
    public phoneNumber: string;

    @IsEmail({},{
        message: 'Please provide valid email Id'
    })
    public email: string;

    public subjectName: string;
    
    @IsOptional()
    public imageLink: string;

};