const path = require('path');
const _ = require('lodash');
const developmentConfig = require('./development.config');
const testConfig = require('./test.config');



const Environments = {
  Development: 'development',
  Test: 'test'
};

let nodeEnv;
const env = process.env;
switch (env.NODE_ENV) {
  case Environments.Development:
    nodeEnv = Environments.Development;
    break;
  case Environments.Test:
    nodeEnv = Environments.Test;
    break;
  default:
    console.error(`NODE_ENV should be "development" OR "test".
    It is "${env.NODE_ENV}".
    Terminating app.`);
    process.exit(-1);
    nodeEnv = Environments.Development; // TypeSafety hack
}

const configVar = {
  env: nodeEnv,
  root: path.normalize(__dirname + '/../../..'), // Root path of server
  port: env.PORT || 9000,
  ip: env.IP || 'localhost',
  mongo: {
    options: {
      db: {
        safe: true
      },
      useMongoClient: true
    },
    debug: false
  }
};

let envConfig;
switch (configVar.env) {
  case 'development':
    envConfig = developmentConfig;
    break;
  case 'test':
    envConfig = testConfig;
    break;
  default:
    throw new Error(`Environment ${configVar.env} is not supported`);
}

const mergedConfig = _.merge({}, configVar, envConfig);

switch (nodeEnv) {
  case Environments.Development:
    break;
  case Environments.Test:
    mergedConfig.mongo.uri =
      env.MONGO_URI_TEST ||
      mergedConfig.mongo.uri;
    break;
  default:
    break;
}


module.exports = mergedConfig;
