import { generateHashPassword } from '../../lib/generate-hash-password';
import createLogger from '../../lib/logger';
import CreateStudent from './request/create-student.request';
import { GetStudent } from './request/get-student.request';
import Student from './student.model';
import { StudentRepositry } from './student.repositry';

const logger = createLogger('Student Service');

export class StudentService {

    constructor(private studentRepositry = new StudentRepositry()) {}

    // create student
    public async create(student: CreateStudent): Promise<boolean> {
        logger.info(`Create a new student => ${JSON.stringify(student)}`);
        
        const { salt, hashPassword } = await generateHashPassword(student.password);
        const isCreated = await this.studentRepositry.create(student, salt, hashPassword);
        
        return isCreated;
    }

     // get student
     public async get(student: GetStudent): Promise<Student> {
        logger.info(`get student details by email id ${student.emailId} `);
        
        const isFetched = await this.studentRepositry.getbyEmail(student.emailId);
        
        return isFetched;
    }

}