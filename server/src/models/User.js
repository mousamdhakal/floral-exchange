const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  user_name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  location: Object,
  interest: {
    type: String,
    enum: ['plant', 'flower', 'tree']
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
