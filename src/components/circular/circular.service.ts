import createLogger from '../../lib/logger';
import Circular from './circular.model';
import { CircularRepositry } from './circular.repositry';

const logger = createLogger('Circular Service');

export class CircularService {

    constructor(private circularRepositry = new CircularRepositry()) {}

    // get top 5 circulars ordered by date of creation
    public async get(schoolId: string): Promise<Circular[]> {
        logger.info(`Get top 5 circulars ordered by date of creation for  => ${schoolId}`);
        
        const circulars = await this.circularRepositry.getCircular(schoolId);

        return circulars;
    }

}