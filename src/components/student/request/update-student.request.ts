import { IsInt, IsPhoneNumber, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export default class UpdateStudent {
    
    @IsNotEmpty({
        message: 'Student Id is required'
    })
    @IsInt({
        message: 'Please provide valid student Id'
    })
    public studentId: number;

    @IsPhoneNumber()
    @IsNotEmpty({
        message: 'Phone Number is required'
    })
    public phone: string;

    @IsEmail({},{
        message: 'Please provide valid email Id'
    })
    @IsNotEmpty({
        message: 'Email is required'
    })
    public email: string;

    @MaxLength(3,{
        message: 'Please provide valid class Id'
    })
    @IsNotEmpty({
        message: 'Class Id is required',
    })
    public classId: string;

    @IsInt({
        message: 'Please provide valid password Id'
    })
    public passwordId: number;

};