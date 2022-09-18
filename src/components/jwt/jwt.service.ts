import jwt from 'jsonwebtoken';
import createLogger from '../../lib/logger';
import Environment from '../../environments/environment';

const logger = createLogger('Jwt Service');

const environment = new Environment();

// Create access token using secret token
function generateAccessToken(obj: { userId: string, schoolId: number }) {
    return jwt.sign(obj, Buffer.from(String(environment.jwtSecretToken)), {
        expiresIn: '7d'
    });
}

// Create token with payload => userId,schoolId
export const createToken = async (schoolId: number, userId: string) => {
    try {

        logger.info('Create jwt token');

        const token = await generateAccessToken({
            userId,
            schoolId,
        });

        return token;

    } catch (err: any) {

        logger.error(err.message);

        throw err;
    }
};