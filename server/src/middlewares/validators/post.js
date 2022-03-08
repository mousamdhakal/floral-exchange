const Joi = require('joi');
const validate = require('../../utils/validate');

// Rules for validating input for creating new post
const schema = Joi.object({
  type: Joi.string().valid('plant', 'flower', 'tree').required(),
  description: Joi.string().max(1000),
  age: Joi.number(),
  title: Joi.string().max(500).required(),
  image: Joi.string(),
  date: Joi.date(),
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
  if(req.body.location) {
    req.body.location = JSON.parse(req.body.location)
  }
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

module.exports = { postValidator };
