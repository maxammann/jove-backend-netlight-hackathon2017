var express = require('express')
var router = express.Router()
var userCtrl = require('./account_controller')

router.get('/login', userCtrl.login)

module.exports = router
