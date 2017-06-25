require('./user')
var mongoose = require('mongoose')

var User = mongoose.model('User')

exports.get = function (req, res) {
  User.load(req.param.id, function (err, user) {
    res.json(user)
  })
}

// todo get new user for specific company, which should be shown in the app (recommendations)
// todo get users for specific account
