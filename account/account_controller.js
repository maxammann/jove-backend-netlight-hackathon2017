require('./account')
var mongoose = require('mongoose')
var Account = mongoose.model('Account')

exports.get = function (req, res) {
  Company.load(req.param.id, function (err, account) {
    res.json(account)
  })
}
