const router = require('express').Router()

const { upload } = require('./utils/imageEngine')

const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const chatRouter = require('./routes/chat')
const imageRouter = require('./routes/image')
const contactRouter = require('./routes/contact')

router.use('/user', userRouter)
router.use('/post', postRouter(upload))
router.use('/chat', chatRouter)
router.use('/image', imageRouter(upload))
router.use('/contact', contactRouter)

/**
 * GET /api
 */
router.get('/', (req, res) => {
  res.json({
    app: process.env.APP_NAME || 'Floral Exchange',
    apiVersion: process.env.APP_VERSION || '1.0.0',
  })
})

module.exports = router
