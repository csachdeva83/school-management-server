import { IsInt, IsPhoneNumber, IsEmail, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';

export default class CreateStudent {
    
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

    @MaxLength(3,{
        message: 'Please provide valid class Id'
    })
    @IsNotEmpty({
        message: 'Class Id is required',
    })
    public classId: string;

    @MaxLength(30, {
        message: 'Password is maximum 30 character',
    })
    @IsNotEmpty({
        message: 'Password is required',
    })
    public password: string;

    @IsInt({
        message: 'Please provide valid password Id'
    })
    @IsOptional()
    public passwordId: number;

};