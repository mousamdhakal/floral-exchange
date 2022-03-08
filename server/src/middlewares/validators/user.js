const Joi = require('joi');
const validate = require('../../utils/validate');

// Rules for validating input for creating new user
const schema = Joi.object({
  first_name: Joi.string().max(255).required(),
  last_name: Joi.string().max(255).required(),
  user_name: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  // Password must contain at least 8 characters one letter and one number
  password: Joi
    .string()
    .pattern(new RegExp('^(?=.*?[a-z])(?=.*?[0-9]).{8,}$'))
    .message(
      'Password must contain at least 8 characters including one letter and one number'
    )
    .max(255)
    .required(),
  location: Joi.object({ latitude: Joi.number().required(), longitude: Joi.number().required() }),
  interest: Joi.string().valid('plant', 'flower', 'tree'),
})

/**
 * Validate the input for creating a new user
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 * @returns {Promise}
 */
function userValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

module.exports = { userValidator };
