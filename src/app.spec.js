/* tslint:disable:only-arrow-functions no-invalid-this */
const App = require('./app');
const request = require('supertest');

let TestApplication;
module.exports = TestApplication;

describe('App', () => {

  before('Init app', () => {
    TestApplication = new App();
  });

  it('starts successfully', function (done) {
    TestApplication.run().then(done).catch(done);
  });

  it('responds to requests', function (done) {
    request(TestApplication.app)
      .get('/')
      .expect(200)
      .end(done);
  });
});

