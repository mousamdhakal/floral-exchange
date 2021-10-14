const express = require('express');
const { register, login } = require('../controllers/user');
const { userValidator } = require('../middlewares/validators/user');

const router = express.Router();

// Validate input before creating a user
router.post('/', userValidator, register);

router.post('/login', login);

module.exports = router;
