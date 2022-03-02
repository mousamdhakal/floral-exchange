const Joi = require('joi');
const validate = require('../../utils/validate');

// Rules for validating input for creating new post
const schema = Joi.object({
  message: Joi.string().max(5000).required(),
  sender_id: Joi.string().max(255).required(),
  receiver_id: Joi.string().max(255).required(),
  read: Joi.boolean()
})

/**
 * Validate the input for creating a new chat message
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 * @returns {Promise}
 */
function chatValidator(data, onSuccess, onError) {
  return validate(data, schema)
    .then(() => onSuccess())
    .catch((err) => onError(err));
}

module.exports = { chatValidator };
