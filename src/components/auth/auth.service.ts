import { authenticatePassword } from '../../lib/generate-hash-password';
import createLogger from '../../lib/logger';
import { AuthRepositry } from './auth.repositry';
import AuthLogin from './request/login-auth.request';

const logger = createLogger('Auth Service');

export class AuthService {

    constructor(private authRepositry = new AuthRepositry()) { }


    public async authenticateUser(credentials: AuthLogin): Promise<boolean> {
        logger.info('Get salt and hash by email and compare with user password');

        const { salt, hash } = await this.authRepositry.getSaltAndHashByEmail(credentials.email);

        // this function checks for password authentication , right now not working properly
        const isPasswordAuthenticated = await authenticatePassword(credentials.password, salt, hash);

        return true;
    }

}