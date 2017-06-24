var express = require('express')
var router = express.Router()
var user = require('./company')
var userCtrl = require('./company_controller')

/* GET users listing. */
router.get('/company', userCtrl.get)

module.exports = router
