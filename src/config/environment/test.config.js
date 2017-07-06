// Test specific configuration
const testConfig = {
  port: process.env.PORT || 9002,

  mongo: {
    uri: 'mongodb://localhost/pennybox-nodejs-test-task-test',
    debug: false
  }
};

module.exports = testConfig;
