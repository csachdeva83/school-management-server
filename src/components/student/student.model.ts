import { IsPhoneNumber, IsEmail, MaxLength, IsOptional } from 'class-validator';

export default class Student {
    
    public firstName: string;

    public lastName: string;

    public birthDate: string;

    @IsPhoneNumber()
    public phoneNumber: string;

    @IsEmail({},{
        message: 'Please provide valid email Id'
    })
    public email: string;

    @MaxLength(3,{
        message: 'Please provide valid class Id'
    })
    public classId: string;

    @IsOptional()
    public imageLink: string;

};