const Boom = require('@hapi/boom')

const { getAllPosts, createNewPost, getUserPosts } = require('../services/post')

/**
 * Get information of all posts
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
const getPosts = async (req, res, next) => {

  getAllPosts()
    .then(posts => {
      res.status(200).json({
        posts: posts,
        status: 200,
      })
    })
    .catch((err) => next(err));

}

/**
 * Get information of user posts
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
const getPostsForUser = async (req, res, next) => {

  getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json({
        posts: posts,
        status: 200,
      })
    })
    .catch((err) => next(err));

}

/**
 * Create new post with given information
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
const createPost = async (req, res, next) => {
  const post = req.body
  post.userId = req.user._id

  createNewPost(post)
    .then(post => {
      res.status(200).json({
        message: 'Post created successfully',
        post: post,
        status: 200,
      })
    })
    .catch((err) => next(err));

}

module.exports = { getPosts, createPost, getPostsForUser }

