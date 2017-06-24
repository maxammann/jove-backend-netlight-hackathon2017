require('./company')
var mongoose = require('mongoose')
var Company = mongoose.model('Company')

exports.get = function (req, res) {
  console.log(req)
  Company.load(req.param._id, function (err, company) {
    res.json(company)
  })
}
