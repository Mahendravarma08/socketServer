const express = require('express')
const router = express.Router()

const loginController = require('./src/endpoints/login')

router.use(loginController)


module.exports = router

