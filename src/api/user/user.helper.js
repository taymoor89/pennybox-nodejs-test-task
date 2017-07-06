const UserSchema = require('./user.model');

function addDevice (params, done) {
  // TODO: Refactor and rewrite me, I'm bad function!
  if(!params.userId){
    return done({success: false, message: 'No userId provided'})
  }
  if(!params.deviceId){
    return done({success: false, message: 'Missing deviceId'})
  }

  UserSchema
    .find({_id: params.userId})
    .then(function(user){
      if(!user[0]){
        return done({success: false, message: 'User doesn\'t exist.'});
      }

      UserSchema
        .update(
          {_id: params.userId},
          {deviceId: params.deviceId}
        )
        .then(function(){
          return done({success: true, message: 'Device assigned to user'});
        }, function(err){
          return done({success: false, message: err});
        });
    });
}

module.exports = addDevice;
