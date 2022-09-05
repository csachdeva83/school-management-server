import * as fs from 'fs';
import * as path from 'path';
import { config as configDotenv } from 'dotenv';

import { EnvironmentFile, Environments } from './environment.constant';
import IEnvironment from './environment.interface';

class Environment implements IEnvironment {

    public port: number;

    public secretKey: string;

    public applyEncryption: boolean;

    constructor(NODE_ENV?: string) {
      const env: string= NODE_ENV || process.env.NODE_ENV || Environments.DEV;
      const port: string | undefined | number = process.env.PORT || 5000;
      this.setEnvironment(env);
      this.port = Number(port);
      this.applyEncryption = JSON.parse(process.env.APPLY_ENCRYPTION);
      this.secretKey =  process.env.SECRET_KEY;
    }

    public getCurrentEnvironment(): string {
      let environment: string = process.env.NODE_ENV || Environments.DEV;

      if (!environment) {
        environment = Environments.LOCAL;
      }
      switch (environment) {
        case Environments.PRODUCTION:
          return Environments.PRODUCTION;
        case Environments.DEV:
            return Environments.DEV;
        case Environments.TEST:
            return Environments.TEST;
        case Environments.LOCAL:
            return Environments.LOCAL;
        default:
          return Environments.LOCAL;
      }
    }

    public setEnvironment(env: string): void {
      let envPath: string;
      const rootdir: string = path.resolve(__dirname, (process.env.NODE_ENV === 'production') ? '../../../' : '../../');
      switch (env) {
        case Environments.PRODUCTION:
          envPath = path.resolve(rootdir, EnvironmentFile.PRODUCTION);
          break;
        case Environments.TEST:
          envPath = path.resolve(rootdir, EnvironmentFile.TEST);
          break;
        case Environments.LOCAL:
          envPath = path.resolve(rootdir, EnvironmentFile.LOCAL);
          break;
        default:
          envPath = path.resolve(rootdir, EnvironmentFile.LOCAL);
      }
      if (!fs.existsSync(envPath)) {
        throw new Error('.env file is missing in root directory');
      }
      configDotenv({ path: envPath });
    }

    public isProductionEnvironment(): boolean {
      return this.getCurrentEnvironment() === Environments.PRODUCTION;
    }

    public isDevEnvironment(): boolean {
      return this.getCurrentEnvironment() === Environments.DEV || this.getCurrentEnvironment() === Environments.LOCAL;
    }

    public isTestEnvironment(): boolean {
      return this.getCurrentEnvironment() === Environments.TEST;
    }

}

export default Environment;
