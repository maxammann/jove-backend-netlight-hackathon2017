var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    name: String,
    eMail: String,
    phoneNumber: String,
    dateOfBirth: String,
    birthPlace: String,
    uuid: String,
    photo: String,
    accountId: Number
  },
  {collection: 'User'}
)

UserSchema.statics = {
  load: function (id, cb) {
    this.findOne({}, cb)
  }
}

module.exports = mongoose.model('User', UserSchema)