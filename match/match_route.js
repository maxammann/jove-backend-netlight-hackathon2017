var express = require('express')
var router = express.Router()
var matchController = require('./match_controller')

router.get('/match', matchController.get)

module.exports = router
