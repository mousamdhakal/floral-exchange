const router = require('express').Router()

/**
 * GET /api
 */
 router.get('/', (req, res) => {
  res.json({
    app: process.env.APP_NAME || 'Floral Exchange',
    apiVersion: process.env.APP_VERSION || '1.0.0',
  });
});

module.exports = router;
