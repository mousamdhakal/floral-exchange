const express = require('express');
const { register, login, getAllUsers, updateUser, getUserInfo } = require('../controllers/user');
const { userValidator, userUpdateValidator } = require('../middlewares/validators/user');
const authenticate = require('../middlewares/authenticate')


const router = express.Router();

// Validate input before creating a user
router.post('/', userValidator, register);

router.post('/login', login);

router.get('/', getAllUsers);

router.get('/:id', getUserInfo);

router.patch('/', authenticate, userUpdateValidator, updateUser)

module.exports = router;
