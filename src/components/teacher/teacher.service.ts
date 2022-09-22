import { generateHashPassword } from '../../lib/generate-hash-password';
import createLogger from '../../lib/logger';
import CreateTeacher from './request/create-teacher.request';
import Teacher from './teacher.model';
import { TeacherRepositry } from './teacher.repositry';

const logger = createLogger('Teacher Service');

export class TeacherService {

    constructor(private teacherRepositry = new TeacherRepositry()) {}

    // create teacher
    public async create(teacher: CreateTeacher): Promise<boolean> {
        logger.info(`Create a new teacher => ${JSON.stringify(teacher)}`);
        
        const { salt, hashPassword } = await generateHashPassword(teacher.password);
        const isCreated = await this.teacherRepositry.create(teacher, salt, hashPassword);
        
        return isCreated;
    }

    // get teacher
    public async getById(teacherId: string): Promise<Teacher> {
        logger.info(`Get teacher => ${teacherId}`);
        
        const teacher = await this.teacherRepositry.getbyId(teacherId);
        
        return teacher;
    }

}