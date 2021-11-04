const { sign } = require('jsonwebtoken')
const Boom = require('@hapi/boom')

const { getUser, createUser } = require('../services/user')
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
  .then(user => {
    res.status(200).json({
      message: 'User created successfully, login to get access',
      status: 200,
    })
  })
  .catch((err) => next(err));

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

module.exports = { register, login }
