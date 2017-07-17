let UserSchema = require('./user.model');

async function addDevice (params) {
  const {userId, deviceId} = params;

  if(!userId) return new Error('No userId provided');
  if(!deviceId) return new Error('Missing deviceId');

  try {
    await UserSchema.findByIdAndUpdate(userId, {deviceId});
    return 'Device has been added';
  }
  catch(error) {
    return error; 
  }
}

module.exports = addDevice;