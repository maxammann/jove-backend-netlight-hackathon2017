var express = require('express');
var router = express.Router();
var user = require('./Company');
var userCtrl = require('./CompanyCtrl');

/* GET users listing. */
router.get('/company', userCtrl.get);

module.exports = router;
