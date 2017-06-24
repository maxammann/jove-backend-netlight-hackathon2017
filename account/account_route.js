var express = require('express')
var router = express.Router()
var userCtrl = require('./account_controller')

/* GET users listing. */
router.get('/account', userCtrl.get)

module.exports = router
