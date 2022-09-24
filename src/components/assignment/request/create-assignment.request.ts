import { IsInt, MaxLength, IsNotEmpty } from 'class-validator';

export default class CreateAssignment {

    @MaxLength(5,{
        message: 'Please provide valid teacher Id'
    })
    @IsNotEmpty({
        message: 'Teacher Id is required',
    })
    public teacherId: string;

    @MaxLength(3,{
        message: 'Please provide valid class Id'
    })
    @IsNotEmpty({
        message: 'Class Id is required',
    })
    public classId: string;

    @IsNotEmpty({
        message: 'Pdf link is required',
    })
    public pdfLink: string;

    @MaxLength(50, {
        message: 'Title is maximum 50 character',
    })
    @IsNotEmpty({
        message: 'Title is required',
    })
    public title: string;

    @IsInt({
        message: 'Please provide valid total marks of assignment',
    })
    @IsNotEmpty({
        message: 'Total Marks is required',
    })
    public totalMarks: number;

    @IsNotEmpty({
        message: 'Submission Date is required',
    })
    public submissionDate: string;

};