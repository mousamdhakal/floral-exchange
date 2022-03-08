const express = require('express');
const authenticate = require('../middlewares/authenticate');
const { saveNewImage, streamImage } = require('../controllers/image');

const router = express.Router();

module.exports = (upload) => {

  router.post('/', authenticate, upload.single('image'), saveNewImage);
  router.route('/:filename').get(streamImage);

  return router
}

