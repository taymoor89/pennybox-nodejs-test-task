const expect = require('chai').expect;
const config = require('./index');

describe('Config', () => {

  it('"env" to be "test"', () => {
    expect(config.env).to.be.eq('test');
  });

  it('"port" to be number', () => {
    const portNumber = parseInt(config.port, 10);
    expect(portNumber).to.exist;
  });

  it('"ip" to be equal "localhost"', () => {
    expect(config.ip).to.be.eq('localhost');
  });

  it('"mongo.uri" to be string', () => {
    expect(typeof config.mongo.uri).to.be.eq('string');
  });
});
