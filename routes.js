const express = require('express')
const router = express.Router()

const loginController = require('./src/endpoints/login')

const messageController = require('./src/endpoints/messages')

router.use([loginController,messageController])


module.exports = router

