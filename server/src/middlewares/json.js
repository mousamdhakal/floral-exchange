const { StatusCodes } = require('http-status-codes');
const _isEmpty = require('lodash/isEmpty');
const Boom = require('@hapi/boom');

/**
 * Middleware to handle empty JSON body requests and other edge cases if any.
 *
 * @param  {Object}   request
 * @param  {Object}   response
 * @param  {Function} next
 */
function json(request, response, next) {
  const { body, method } = request;
  const disallowedHttpHeaders = ['PUT', 'POST', 'PATCH'];

  if (request.is('application/json') && disallowedHttpHeaders.includes(method) && _isEmpty(body)) {
    throw Boom.badRequest('Empty JSON');
  }

  next();
}

module.exports = json;
