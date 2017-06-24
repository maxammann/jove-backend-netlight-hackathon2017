require('./User');
var mongoose = require('mongoose');
//var _  = require('underscore');

var User = mongoose.model("User");

exports.get = function (req, res) {
    User.findOne({},'Name', function(err, user) {
        res.json(user);
    })
};
