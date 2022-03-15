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
function createNewPost(post, imageName) {
  const modifiedPost = JSON.parse(JSON.stringify(post))
  if (imageName) {
    modifiedPost.image = imageName
  }

  const newPost = new Post(modifiedPost)

  return newPost.save()
    .then((post) => post);
}

/**
 * Update a post
 * 
 * @param {String} id ID of post to update
 * @param {Object} post parameter to update
 * return updated post info
 */
function updatePostWithId(id, post) {
  return Post.findOneAndUpdate({ _id: id }, post, { new: true }).exec()
}

/**
 * 
 * @param {String} id id of post to delete
 * @returns 
 */
function deletePostWithId(id) {
  return Post.findOneAndDelete({ _id: id }).exec()
}

module.exports = {
  getPost,
  getAllPosts,
  createNewPost,
  getUserPosts,
  updatePostWithId,
  deletePostWithId,
}