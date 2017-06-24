require('./account')
var mongoose = require('mongoose')
var Account = mongoose.model('Account')

exports.get = function (req, res) {
  Account.load(req.param.id, function (err, account) {
    res.json(account)
  })
}

exports.login = function (req, res) {
  Account.login(req.param.username, req.param.password, function (err, account) {
    if (err) {
      return console.error(err)
    }
    if (account) {
      res.json({result: account})
    }
  })
}