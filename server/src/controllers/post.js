const Boom = require('@hapi/boom')
const { saveImage } = require('../services/image')

const { getAllPosts, createNewPost, getUserPosts, updatePostWithId, deletePostWithId } = require('../services/post')

/**
 * Get information of all posts
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
const getPosts = async (req, res, next) => {
  console.log(req.user)
  const userId = req.user._id
  // For demonstration purpose to show loading sign
  setTimeout(() =>
    getAllPosts(userId)
      .then((posts) => {
        res.status(200).json({
          posts: posts,
          status: 200,
        })
      })
      .catch((err) => next(err)), 500
  )
}

/**
 * Get information of user posts
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
const getPostsForUser = async (req, res, next) => {
  setTimeout(() =>
    getUserPosts(req.params.id)
      .then((posts) => {
        res.status(200).json({
          posts: posts,
          status: 200,
        })
      })
      .catch((err) => next(err)), 500
  )
}

/**
 * Create new post with given information
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
const createPost = async (req, res, next) => {
  const post = req.body
  post.user_id = req.user._id

  let imageToReturn = null
  console.log(req.file, '>>>>>>>>>>>>>')

  if (req.file) {
    saveImage(req.file.filename, req.file.id)
      .then((image) => {
        imageToReturn = image
        savePostAfterImageProcessing()
      })
      .catch((err) => next(err))
  } else {
    delete post.image;
    savePostAfterImageProcessing()
  }

  function savePostAfterImageProcessing() {
    setTimeout(() =>
      createNewPost(post, imageToReturn && imageToReturn.filename ? imageToReturn.filename : null)
        .then((createdPost) => {
          const modifiedPost = JSON.parse(JSON.stringify(createdPost))
          if (imageToReturn) {
            modifiedPost.image = imageToReturn
          }
          console.log(modifiedPost)
          res.status(200).json({
            message: 'Post created successfully',
            post: modifiedPost,
            status: 200,
          })
        })
        .catch((err) => next(err)), 500)
  }
}

/**
 * Update Post
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
const updatePost = async (req, res, next) => {

  const postId = req.params.id
  updatePostWithId(postId, req.body)
    .then(post => {
      res.status(200).json({
        post: post,
        status: 200,
      })
    })
    .catch((err) => next(err));

}

const deletePost = async (req, res, next) => {
  const postId = req.params.id
  console.log('hi>>>>')
  console.log(postId)
  deletePostWithId(postId)
    .then(() => {
      res.status(200).json({
        message: 'Post deleted successfully',
        status: 200,
      })
    })
    .catch((err) => next(err));
}

module.exports = { getPosts, createPost, getPostsForUser, updatePost, deletePost }

