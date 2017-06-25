require('./account')
var mongoose = require('mongoose')
var Account = mongoose.model('Account')
var jwt = require('jwt-simple');

var secretKey = "very secret";


exports.login = function (req, res) {
  Account.login(req.query.username, req.query.password, function (err, account) {
    if (err) {
      return console.error(err)
    }
    if (account) {
      res.status(201).json({token: createToken(account), account: account});
    }
  })
}
function createToken(account) {
    var tokenPayload = {
        account: {
            _id: account._id,
            userName: account.username,
            userPassword: account.password
        }
    };
    return jwt.encode(tokenPayload, secretKey);
}