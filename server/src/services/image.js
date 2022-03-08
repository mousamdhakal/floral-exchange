const Image = require('../models/Image')
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
const connect = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

let gfs

connect.once('open', () => {
  // Init stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: 'uploads',
  })
})

/**
 * Save an image
 *
 * @param {String} fileName
 * @param {String} fileId
 * @returns {Promise}
 */
function saveImage(fileName, fileId) {
  let newImage = new Image({
    filename: fileName,
    fileId: fileId,
  })

  return newImage.save().then((image) => {
    return image
  })
}

/**
 * Save an image
 *
 * @param {String} fileName
 * @param {String} fileId
 * @returns {Promise}
 */
function streamImageWithFilename(fileName) {

  return new Promise((resolve, reject) => {
    gfs.find({ filename: fileName }).toArray((err, files) => {
      if (!files || files.length === 0) {
        reject('File does not exist')
      }
  
      const readstream = gfs.openDownloadStreamByName(fileName)
      resolve(readstream)
    })
  })
  
}

module.exports = {
  saveImage,
  streamImageWithFilename
}
