/* eslint-disable vars-on-top */
// eslint-disable-next-line import/no-unresolved
import Pool from 'mysql2/typings/mysql/lib/Pool';
import Environment  from './environments/environment';

declare global {
  // eslint-disable-next-line no-var
  var POOL: Pool;
  // eslint-disable-next-line no-var
  var environment: Environment;
}

export const setGlobalEnvironment = (environment: Environment): void => {
  global.environment = environment;
};
