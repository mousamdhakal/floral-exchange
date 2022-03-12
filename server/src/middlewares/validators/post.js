const Joi = require('joi');
const validate = require('../../utils/validate');

// Rules for validating input for creating new post
const schema = Joi.object({
  type: Joi.string().valid('plant', 'flower', 'tree').required(),
  description: Joi.string().max(1000),
  image: Joi.string().max(255),
  age: Joi.number(),
  title: Joi.string().max(500).required(),
  date: Joi.string().max(500).required(),
  location: Joi.object({ latitude: Joi.number().required(), longitude: Joi.number().required() }),
})

// Rules for validating input for updating post
const updatePostSchema = Joi.object({
  type: Joi.string().valid('plant', 'flower', 'tree'),
  description: Joi.string().max(1000),
  image: Joi.string().max(255),
  age: Joi.number(),
  title: Joi.string().max(500),
  date: Joi.string().max(500),
  location: Joi.object({ latitude: Joi.number().required(), longitude: Joi.number().required() }),
})

/**
 * Validate the input for creating a new post
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 * @returns {Promise}
 */
function postValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}
/**
 * Validate the input for creating a new post
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 * @returns {Promise}
 */
function postUpdateValidator(req, res, next) {
  return validate(req.body, updatePostSchema)
    .then(() => next())
    .catch((err) => next(err));
}

module.exports = { postValidator, postUpdateValidator };
