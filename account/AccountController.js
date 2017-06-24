require('./Account');
var mongoose = require('mongoose');
var Account = mongoose.model("Account");

exports.get = function (req, res) {
    console.log(req)
    Company.find(req.query).exec(function(err, account) {
        res.json(account);
    })
};
