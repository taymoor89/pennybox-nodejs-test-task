let _         = require('lodash');
let Mongoose  = require('mongoose');
let request   = require('supertest');
let chai      = require('chai');
let App       = require('../../app');
let UserModel = require('./user.model');
let Config    = require('../../config/environment');
let expect    = chai.expect;
let assert    = chai.assert;

describe('user.controller', () => {
  let app = null;
  
  before(async () => {
    app = new App().app;
    await Mongoose.connect(Config.mongo.uri, Config.mongo.options);
    await UserModel.remove({}); // Remove previously added users in test db
  });

  describe('[GET] /users', () => {
    let users = null;

    beforeEach(async () => {
      docs = [
        {
          name: 'Anton',
          role: 'admin'
        },
        {
          name: 'Taimoor',
          role: 'developer'
        },
        {
          name: 'Tim Cook',
          role: 'product_owner'
        }
      ];
      users = await UserModel.create(docs);
    });

    afterEach(async () => {
      let ids   = _.map(users, '_id');
      let query = {
        _id: {
          $in: ids
        }
      };
      await UserModel.remove(query);
    });

    it('Should get users', () => {
      return request(app)
        .get('/users')
        .expect(200)
        .expect((response) => {
          let {body, header} = response;
          expect(body.length).to.be.equal(3);
          expect(header.amount).to.be.equal('3');
          expect(header.total).to.be.equal('3');
        });
    });

    it('should limit records with limit query parameter', () => {
      const limit = 1;
      return request(app)
        .get('/users')
        .query({limit})
        .expect(200)
        .expect((response) => {
          let {body, header} = response;
          expect(body.length).to.be.equal(1);
          expect(header.amount).to.be.equal('1');
          expect(header.total).to.be.equal('3');
        });
    });

    it('should skip records with skip query parameter', () => {
      const skip  = 1;
      return request(app)
        .get('/users')
        .query({skip})
        .expect(200)
        .expect((response) => {
          let {body, header} = response;
          expect(body.length).to.be.equal(2);
          expect(header.amount).to.be.equal('2');
          expect(header.total).to.be.equal('3');
        });
    });
  });

  describe('[POST] /users', () => {
    let payload = null;

    beforeEach(() => {
      payload = {
        name: 'Anton',
        role: 'admin'
      };
    });

    afterEach(async () => {
      await UserModel.remove({_id: payload._id});
    });

    it('Should add new user', () => {
      return request(app)
        .post('/users')
        .send(payload)
        .expect(201)
        .expect((response) => {
          let {body}  = response;
          delete body.__v;
          payload._id = body._id;
          assert.deepEqual(body, payload);
        });
    });

    it('Should complain if name is not provided', () => {
      delete payload.name;
      return request(app)
        .post('/users')
        .send(payload)
        .expect(500);
    });

    it('Should complain if role is not provided', () => {
      delete payload.role;      
      return request(app)
        .post('/users')
        .send(payload)
        .expect(500);
    });
  });
});