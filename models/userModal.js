const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicUrl: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  orders:{
    type: Array,
    required: false,
  },
  blocked:{
    type: Boolean,
    required: true,
  },
  type:{
    type: String,
    required: true,
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => {
      next(err);
    });
});

//add test data

const UserModal = mongoose.model('User', userSchema);

module.exports = UserModal
