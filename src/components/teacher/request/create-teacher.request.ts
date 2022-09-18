import { IsInt, IsPhoneNumber, IsEmail, MaxLength, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export default class CreateStudent {
    
    @MaxLength(5, {
        message: 'id is maximum 5 character',
    })
    @IsOptional()
    public id: string;

    @MaxLength(30, {
        message: 'First name is maximum 30 character',
    })
    @IsNotEmpty({
        message: 'First name is required',
    })
    public firstName: string;

    @MaxLength(30, {
        message: 'Last name is maximum 30 character',
    })
    @IsNotEmpty({
        message: 'Last name is required',
    })
    public lastName: string;

    @IsNotEmpty({
        message: 'Birth Date is required',
    })
    public birthDate: string;

    @IsPhoneNumber()
    @IsNotEmpty({
        message: 'Phone Number is required',
    })
    public phoneNumber: string;

    @IsEmail({},{
        message: 'Please provide valid email Id'
    })
    @IsNotEmpty({
        message: 'Email is required',
    })
    public email: string;

    @MaxLength(30, {
        message: 'Password is maximum 30 character',
    })
    @IsNotEmpty({
        message: 'Password is required',
    })
    public password: string;

    @IsNotEmpty({
        message: 'Subject name is required',
    })
    public subjectName: string;
    
    @IsInt({
        message: 'Please provide valid subject Id',
        each: true
    })
    @IsArray()
    @IsNotEmpty({
        message: 'Subject Ids are required',
    })
    public subjectIds: number[];

    @IsInt({
        message: 'Please provide valid school Id',
    })
    @IsNotEmpty({
        message: 'School Id is required',
    })
    public schoolId: number;

    @IsOptional()
    public imageLink: string;

    @IsInt({
        message: 'Please provide valid password Id'
    })
    @IsOptional()
    public passwordId: number;


};