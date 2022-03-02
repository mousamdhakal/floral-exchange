const express = require('express');
const { register, login, getAllUsers } = require('../controllers/user');
const { userValidator } = require('../middlewares/validators/user');

const router = express.Router();

// Validate input before creating a user
router.post('/', userValidator, register);

router.post('/login', login);

router.get('/', getAllUsers)

module.exports = router;
