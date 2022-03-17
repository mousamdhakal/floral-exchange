const Boom = require('@hapi/boom')

const {
  createContactForPost,
  getLastContactBetweenUsers,
} = require('../services/contact')
const { getPost } = require('../services/post')
const { createNewMessage } = require('../services/chat')

/**
 * Get information of chat between two users
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
const addContact = async (req, res, next) => {
  const user = req.user
  const postId = req.params.id

  getPost(postId)
    .then((post) => {
      createContactForPost(user._id, post.user_id, post._id)
        .then((contact) => {
          createNewMessage({
            sender_id: user._id,
            receiver_id: post.user_id,
            message: 'Contacted for an exchange',
          }).then((data) => {
            const receiverSocket = sequenceNumberByClient.get(post.user_id)
            const senderSocket = sequenceNumberByClient.get(user._id)

            if (receiverSocket) {
              receiverSocket.emit('message', data, user)
            }

            if (senderSocket) {
              senderSocket.emit('message', data, user)
            }

            res.status(200).json({
              contact: contact,
              status: 200,
            })
          })
        })
        .catch((err) => next(err))
    })
    .catch((err) => next(err))
}

/**
 * Get information of chat between two users
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
const getLastContact = async (req, res, next) => {
  const user = req.user

  getLastContactBetweenUsers(user._id, req.params.id)
    .then((posts) => {
      if (posts.length === 0) {
        res.status(200).json({
          status: 200,
          contact: null,
        })
      } else {
        getPost(posts[0].post_id)
          .then((post) => {
            res.status(200).json({
              contact: post,
              status: 200,
            })
          })
          .catch((err) => next(err))
      }
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = { addContact, getLastContact }
