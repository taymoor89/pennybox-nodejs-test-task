let Mongoose  = require('mongoose');
let chai      = require('chai');
let UserModel = require('./user.model');
let addDevice = require('./user.helper');
let Config    = require('../../config/environment');
let expect    = chai.expect;
let assert    = chai.assert;


describe('user.helper', () => {
  let user    = null;
  let params  = null;
  
  before(async () => {
    await Mongoose.connect(Config.mongo.uri, Config.mongo.options);
    
    const doc = {
      name: 'Anton',
      role: 'admin'
    };
    
    user = await UserModel.create(doc);
  });
  
  beforeEach(() => {
    params = {
      userId: user._id,
      deviceId: '12312312312'
    };
  });
  
  after(async () => {
    await UserModel.findByIdAndRemove(user._id);
  });
  
  async function shouldReturnError(params, message){
    const result = await addDevice(params);
    expect(result).to.be.an.instanceOf(Error);
    expect(result.message).to.be.equal(message);
  }
  
  it('Should add device for user', async () => {
    const result = await addDevice(params);
    assert.isString(result);
  });
  
  it('Should not add device if userId is not provided', () => {
    delete params.userId;
    shouldReturnError(params, 'No userId provided');
  });
  
  it('Should not add device if deviceId is not provided', ()=> {
    delete params.deviceId;
    shouldReturnError(params, 'Missing deviceId');
  });
});
