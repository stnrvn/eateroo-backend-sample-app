const router = require('express').Router()
const userController = require('./user.controller')

router.post('/register', userController.register)
router.post('/login', userController.login)
// router.post('/googleLogin', userController.googleLogin)

module.exports = router