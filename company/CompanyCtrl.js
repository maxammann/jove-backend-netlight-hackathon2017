require('./Company');
var mongoose = require('mongoose');
var Company = mongoose.model("Company");

exports.get = function (req, res) {
    console.log(req)
    Company.find(req.query).exec(function(err, company) {
        res.json(company);
    })
};
