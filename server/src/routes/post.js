const express = require('express');
const { getPosts, createPost, getPostsForUser, updatePost } = require('../controllers/post');
const { postValidator, postUpdateValidator } = require('../middlewares/validators/post');
const authenticate = require('../middlewares/authenticate')

const router = express.Router()

module.exports = (upload) => {
  // Validate input before creating a post
  router.get('/', authenticate, getPosts)

  router.get('/:id', authenticate, getPostsForUser)

  router.patch('/', authenticate, postUpdateValidator, updatePost)

  router.post('/create', authenticate, upload.single('image'), postValidator, createPost)

  return router;

}
