const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  userid: String,
  password: String,
  updated_at: { type: Date, default: Date.now },
  photo: String,
  email: String,
  created_on: { type: Date, default: Date.now },
  provider: String,
  login_count: { type: Number, default: 1 },
  last_connection: { type: Date, default: Date.now },
});

UserSchema.methods.logged = function (u) {
  this.login_count=this.login_count+1;
  this.last_connection= new Date();
  return this;
};
UserSchema.statics.findOrCreate = require('find-or-create');

module.exports = mongoose.model('User', UserSchema);
