var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AccountSchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    userName: String,
    userPassword: String
  },
  {collection: 'Account'}
)


AccountSchema.statics = {
  login: function (username, password, cb) {
    this.findOne({userName: username, userPassword: password}, 'userName', cb)
  }
}

var Account = mongoose.model('Account', AccountSchema);
module.exports = Account;