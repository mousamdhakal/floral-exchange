const Boom = require('@hapi/boom');

const Post = require('../models/Post');


/**
 * Get a post from id.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
function getPost(id) {
  return Post.findOne({ _id }).exec()
}

/**
 * Get all posts.
 *
 * @param   
 * @returns {Promise}
 */
function getAllPosts() {
  return Post.find().exec()
}

/**
 * Get all posts.
 *
 * @param   
 * @returns {Promise}
 */
function getUserPosts(id) {
  let userPost = Post.find({ user_id: id }).exec()
  return userPost
}



/**
 * Create a post.
 *
 * @param   {Object}  post
 * @returns {Promise}
 */
function createNewPost(post) {
  const newPost = new Post(post)

  return newPost.save()
    .then((post) => post);
}

module.exports = {
  getPost,
  getAllPosts,
  createNewPost,
  getUserPosts,
}