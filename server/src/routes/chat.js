const express = require('express');
const { getChats, getChatWithUser } = require('../controllers/chat');
const authenticate = require('../middlewares/authenticate')

const router = express.Router();

router.get('/', authenticate, getChats);
router.get('/:id', authenticate, getChatWithUser);


module.exports = router;
