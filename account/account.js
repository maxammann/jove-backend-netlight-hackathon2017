var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AccountSchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    username: String,
    password: String
  },
  {collection: 'Account'}
)

var Account = mongoose.model('Account', AccountSchema)

AccountSchema.statics = {
  login: function (user, password, cb) {
    this.findOne({username: username, password: password}).exec(cb)
  }
}

module.exports = Account