const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  role: {
    type: String,
    trim: true,
    required: true
  }
});


module.exports = Mongoose.model('User', UserSchema);
