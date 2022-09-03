import { IsNotEmpty } from 'class-validator';

export class DeleteStudent {

    @IsNotEmpty()
    public studentId: [];
}