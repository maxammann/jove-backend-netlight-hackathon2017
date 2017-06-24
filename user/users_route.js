var express = require('express');
var router = express.Router();
var user = require('./user');
var userCtrl = require('./user_controller');

/* GET users listing. */
router.get('/user', userCtrl.get);

module.exports = router;
