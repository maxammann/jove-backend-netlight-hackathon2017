require('./account')
var mongoose = require('mongoose')
var Account = mongoose.model('Account')

exports.login = function (req, res) {
  Account.login(req.query.username, req.query.password, function (err, account) {
    if (err) {
      return console.error(err)
    }
    if (account) {
      res.json({result: account})
    }
  })
}