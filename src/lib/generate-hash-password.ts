import bcrypt from 'bcrypt';
import createLogger from './logger';

const logger = createLogger('Password');

export const generateHashPassword = async (studentPassword: string) => {
    logger.info('Generating hashed password');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(studentPassword, salt);

    logger.info('Hash Generated');

    return {
        salt,
        hashPassword
    };
};

export const authenticatePassword = async (userPassword: string, salt: string, hash: string) => {

    const hashedPassword = await bcrypt.hash(userPassword.toString(), parseInt(salt));


    console.log(hashedPassword);
    console.log(hash);

    return true;

};

