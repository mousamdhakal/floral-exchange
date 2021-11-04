const router = require('express').Router()

const userRouter = require('./routes/user')
const postRouter = require('./routes/post')

router.use('/user', userRouter)
router.use('/post', postRouter)

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
