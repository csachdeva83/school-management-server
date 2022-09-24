import { IsOptional, MaxLength } from 'class-validator';

export default class Assignment {
    
    @IsOptional()
    public id: string;

    public title: string;

    @MaxLength(3,{
        message: 'Please provide valid class Id'
    })
    public classId: string;

    public pdfLink: string;

    public totalMarks: number;

    public submissionDate: string;

};