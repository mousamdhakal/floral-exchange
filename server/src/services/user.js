const Boom = require('@hapi/boom');

const User = require('../models/User');

/**
 * Get all users.
 *
 * @param   
 * @returns {Promise}
 */
 function getAllUsers() {
  return User.find().exec()
}


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
 * Get a user from id.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
 function getUserFromId(id) {
  return User.findOne({ _id: id }).exec()
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
      if(err.code === 11000){
        throw Boom.conflict(`User with email ${user.email} already exists`)
      } else {
        throw err
      }
    });
}



module.exports = {
  getUser,
  createUser,
  getAllUsers,
  getUserFromId
}