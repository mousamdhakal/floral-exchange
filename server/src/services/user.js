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
      if (err.code === 11000) {
        throw Boom.conflict(`User with email ${user.email} already exists`)
      } else {
        throw err
      }
    });
}

/**
 * 
 * @param {String} id Id of user to update
 * @param {Object} user parameters to update
 * @returns Updated user Info
 */
function updateUserWithId(id, user) {
  return User.findOneAndUpdate({ _id: id }, user, { new: true }).exec()
}


/**
 * 
 * @param {String} id Id of user to delete
 * @returns user Info
 */
function getAUser(id) {
  console.log(id, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  return User.findOne({ _id: id }).exec()
}



module.exports = {
  getUser,
  createUser,
  getAllUsers,
  getUserFromId,
  updateUserWithId,
  getAUser,
}