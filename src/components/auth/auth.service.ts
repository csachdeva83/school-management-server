import { hashPasswordWithGivenSalt } from '../../lib/generate-hash-password';
import createLogger from '../../lib/logger';
import { StudentRepositry } from '../student/student.repositry';
import { TeacherRepositry } from '../teacher/teacher.repositry';
import { AuthRepositry } from './auth.repositry';
import { UserBody } from './auth.types';
import AuthLogin from './request/login.request';

const logger = createLogger('Auth Service');

export default class AuthService {

    constructor(private authRepositry = new AuthRepositry(), private studentRepositry = new StudentRepositry(), private teacherRepositry = new TeacherRepositry()) { }

    public async authenticateUser(credentials: AuthLogin): Promise<UserBody> {
        logger.info('Get salt and hash by user Id and compare with user password');

        let userBody: UserBody;

        if(credentials.userId.substring(0,2) === 'ST'){

            const { salt } = await this.authRepositry.getSaltForStudent(credentials.userId);    
            const hashedPassword = await hashPasswordWithGivenSalt(credentials.password, salt);
            const { count } = await this.authRepositry.validatePasswordForStudent(credentials.userId, hashedPassword);
            if (count === 1) {
                userBody = await this.studentRepositry.getbyId(credentials.userId);
            }
            else{
                return null;            
            }
        
        }else if(credentials.userId.substring(0,2) === 'TR'){
        
            const { salt } = await this.authRepositry.getSaltForTeacher(credentials.userId);    
            const hashedPassword = await hashPasswordWithGivenSalt(credentials.password, salt);
            const { count } = await this.authRepositry.validatePasswordForTeacher(credentials.userId, hashedPassword);
            if (count === 1) {
                userBody = await this.teacherRepositry.getbyId(credentials.userId);
            }
            else{
                return null;            
            }
        }

        return userBody;
    }
}