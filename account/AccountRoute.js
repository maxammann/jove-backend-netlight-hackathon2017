var express = require('express');
var router = express.Router();
var userCtrl = require('./AccountController');

/* GET users listing. */
router.get('/account', userCtrl.get);

module.exports = router;
