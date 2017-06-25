var express = require('express')
var router = express.Router()
var companController = require('./company_controller')

/* GET users listing. */
router.get('/all', companController.all)

module.exports = router
