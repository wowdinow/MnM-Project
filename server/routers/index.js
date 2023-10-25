const express = require('express')
const adminRouter = require('./cms')
const publicRouter = require('./public')
const router = express.Router()

router.use('/pub', publicRouter)
router.use('/', adminRouter)

module.exports = router