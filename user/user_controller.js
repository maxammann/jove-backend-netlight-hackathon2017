require('./user')
var mongoose = require('mongoose')
var jwt = require('jwt-simple')

var User = mongoose.model('User')

exports.get = function (req, res) {
  var token = req.query.token

  var decoded = jwt.decode(token, "very secret")

  User.load(decoded.account._id, function (err, user) {
    res.json({response: user})
  })
}

// todo get companies for specific user, which should be shown in the app (recommendations)
// todo get users for specific account
