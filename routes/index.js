const router = require('express').Router()

const userRoutes = require('../modules/user/user.route')

router.use(userRoutes)

module.exports = router
