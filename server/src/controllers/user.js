const { sign } = require('jsonwebtoken')
const Boom = require('@hapi/boom')

const { getUser, createUser, getAllUsers, updateUserWithId } = require('../services/user')
const { hashPassword, comparePasswords } = require('../utils/hash')

/**
 * Create new user with given information
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
const register = async (req, res, next) => {
  const user = req.body

  user.password = hashPassword(user.password)

  createUser(user)
    .then((user) => {
      user.password = undefined

      // Create new jsonwebtoken for user authorization
      const jsonwebtoken = sign({ result: user }, process.env.JWTSECRETKEY, {
        expiresIn: '1w',
      })
      return res.json({
        message: 'User created successfully',
        token: jsonwebtoken,
        data: user,
        status: 200,
      })
    })
    .catch((err) => next(err))
}

/**
 * Login user with provided email and password
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
const login = async (req, res, next) => {
  const user = req.body

  const result = getUser(user.email)
    .then((result) => {
      // Check if the password entered is correct
      const passwordResult = comparePasswords(user.password, result.password)
      if (passwordResult) {
        result.password = undefined

        // Create new jsonwebtoken for user authorization
        const jsonwebtoken = sign(
          { result: result },
          process.env.JWTSECRETKEY,
          {
            expiresIn: '1w',
          }
        )
        return res.json({
          message: 'login successfully',
          token: jsonwebtoken,
          data: result,
          status: 200,
          
        })
      } else {
        throw error('Unauthorized')
      }
    })
    .catch((err) => {
      next(Boom.unauthorized('Invalid Email or Password'))
    })
}

/**
 * Get information of all users
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
 const getUsers = async (req, res, next) => {

  getAllUsers()
    .then(users => {
      res.status(200).json({
        users: users,
        status: 200,
      })
    })
    .catch((err) => next(err));

}


/**
 * Update User
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
 const updateUser = async (req, res, next) => {

  const userId = req.user._id
  updateUserWithId(userId, req.body)
    .then(user => {
      res.status(200).json({
        user: user,
        status: 200,
      })
    })
    .catch((err) => next(err));

}

module.exports = { register, login, getAllUsers: getUsers, updateUser }
