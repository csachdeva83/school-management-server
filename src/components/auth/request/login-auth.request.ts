import { IsEmail, IsNotEmpty } from 'class-validator';

export default class AuthLogin {

    @IsEmail({}, {
        message: 'Please provide valid email Id'
    })
    @IsNotEmpty({
        message: 'Email is required',
    })
    public email: string;

  
    @IsNotEmpty({
        message: 'Password is required',
    })
    public password: string;



};