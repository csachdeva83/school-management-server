import { IsNotEmpty } from 'class-validator';

export default class AuthLogin {

    @IsNotEmpty({
        message: 'School Id is required',
    })
    public schoolId: number;

    @IsNotEmpty({
        message: 'User Id is required',
    })
    public userId: string;

    @IsNotEmpty({
        message: 'Password is required',
    })
    public password: string;

};