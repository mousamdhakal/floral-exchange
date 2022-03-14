const express = require('express');
const { addContact, getLastContact } = require('../controllers/contact');
const authenticate = require('../middlewares/authenticate')

const router = express.Router();

router.post('/:id', authenticate, addContact);

router.get('/:id',authenticate, getLastContact)

module.exports = router;
