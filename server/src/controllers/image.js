const { saveImage, streamImageWithFilename } = require('../services/image')

/**
 * Save new image
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
const saveNewImage = async (req, res, next) => {

  saveImage(req.file.filename,req.file.id)
    .then(posts => {
      res.status(200).json({
        posts: posts,
        status: 200,
      })
    })
    .catch((err) => next(err));
}

/**
 * Stream image
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
 const streamImage = async (req, res, next) => {
   console.log(req.params.filename)

  streamImageWithFilename(req.params.filename)
    .then(readStream => readStream.pipe(res))
    .catch((err) => next(err));
}

module.exports = {
  saveNewImage, streamImage
}