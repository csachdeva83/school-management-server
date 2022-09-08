enum Environments {
    LOCAL = 'local',
    PRODUCTION = 'production',
    DEV = 'dev',
    TEST = 'test'
}

enum EnvironmentFile {
    LOCAL = '.env',
    PRODUCTION = '.env.production',
    DEV = '.env',
    TEST = '.env.test',
}

export {
  Environments,
  EnvironmentFile,
};
