const { StatusCodes, getReasonPhrase } = require('http-status-codes')

const buildError = require('../utils/buildError');

/**
 * Error response middleware for 404 not found.
 *
 * @param {Object} req
 * @param {Object} res
 */
function notFoundHandler(req, res) {
  res.status(StatusCodes.NOT_FOUND).json({
    error: {
      code: StatusCodes.NOT_FOUND,
      message: getReasonPhrase(StatusCodes.NOT_FOUND),
    },
  });
}

/**
 * Method not allowed error middleware. This middleware should be placed at
 * the very bottom of the middleware stack.
 *
 * @param {Object} req
 * @param {Object} res
 */
function methodNotAllowedHandler(req, res) {
  res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
    error: {
      code: StatusCodes.METHOD_NOT_ALLOWED,
      message: getReasonPhrase(StatusCodes.METHOD_NOT_ALLOWED),
    },
  });
}

/**
 * To handle errors from body parser for cases such as invalid JSON sent through
 * the body (https://github.com/expressjs/body-parser#errors).
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
function bodyParserHandler(err, req, res, next) {
  console.log(err)
  // res.status(err.status).json({
  //   error: {
  //     code: err.status,
  //     message: getReasonPhrase(err.status),
  //   },
  // });
}

/**
 * Generic error response middleware for validation and internal server errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
function genericErrorHandler(err, req, res, next) {
  console.log(err);
  const error = buildError(err);
  res.status(error.code).json({ error });
}

module.exports = {
  notFoundHandler,
  methodNotAllowedHandler,
  bodyParserHandler,
  genericErrorHandler,
};
