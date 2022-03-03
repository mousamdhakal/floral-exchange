const Boom = require('@hapi/boom')

const { getAllChats, getChatBetweenUsers } = require('../services/chat')

/**
 * Get information of all chats
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
const getChats = async (req, res, next) => {
  const user = req.user

  getAllChats(user._id)
    .then(chats => {
      res.status(200).json({
        chats: chats,
        status: 200,
      })
    })
    .catch((err) => next(err));

}

/**
 * Get information of chat between two users
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
 const getChatWithUser = async (req, res, next) => {
  const user = req.user

  getChatBetweenUsers(user._id, req.params.id)
    .then(chats => {
      res.status(200).json({
        chats: chats,
        status: 200,
      })
    })
    .catch((err) => next(err));

}

module.exports = { getChats, getChatWithUser}

