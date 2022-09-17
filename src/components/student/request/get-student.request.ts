import { IsNotEmpty } from 'class-validator';

export class GetStudent {

    @IsNotEmpty()
    public emailId: String;
}