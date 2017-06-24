var express = require('express');
var router = express.Router();
var user = require('./User');
var userCtrl = require('./UsersController');

/* GET users listing. */
router.get('/user', userCtrl.get);

module.exports = router;
