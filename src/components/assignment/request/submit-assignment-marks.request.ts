import { IsInt, MaxLength, IsNotEmpty } from 'class-validator';

export default class SubmitAssignmentMarks {

    @MaxLength(5,{
        message: 'Please provide valid student Id'
    })
    @IsNotEmpty({
        message: 'Student Id is required',
    })
    public studentId: string;

    @IsInt({
        message: 'Please provide valid assignment id',
    })
    @IsNotEmpty({
        message: 'Assignment Id is required',
    })
    public assignmentId: number;

    @IsInt({
        message: 'Please provide valid assignment marks for student',
    })
    @IsNotEmpty({
        message: 'Marks obtained is required',
    })
    public marksObtained: number;

    @MaxLength(50, {
        message: 'status is maximum 50 character',
    })
    @IsNotEmpty({
        message: 'Status is required',
    })
    public status: string;

};