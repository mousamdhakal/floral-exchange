const express = require('express');
const { getPosts, createPost} = require('../controllers/post');
const { postValidator } = require('../middlewares/validators/post');
const authenticate = require('../middlewares/authenticate')

const router = express.Router();

// Validate input before creating a post
router.get('/', authenticate, getPosts);

router.post('/create',authenticate, postValidator ,createPost);

module.exports = router;
