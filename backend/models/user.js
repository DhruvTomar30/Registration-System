const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  email: String,
  password: String
});

userSchema.methods.comparePassword = function(password) {
  return this.password === password;
};

const User = mongoose.model('User', userSchema);

module.exports = User;