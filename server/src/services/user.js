const Boom = require('@hapi/boom');

const User = require('../models/User');


/**
 * Get a user from email.
 *
 * @param   {String}  email
 * @returns {Promise}
 */
function getUser(email) {
  return User.findOne({ email }).exec()
}


/**
 * Create a user.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */
function createUser(user) {
  const newUser = new User(user)

  return newUser.save()
    .then((user) => user)
    .catch(err => {
      if (err.code === 11000) {
        throw Boom.conflict(`User with email ${user.email} already exists`)
      } else {
        throw err
      }
    });
}

module.exports = {
  getUser,
  createUser
}