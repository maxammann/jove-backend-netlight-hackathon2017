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
    image: String,
    accountId: {type: Schema.Types.ObjectId, ref:'account'}
  },
  {collection: 'User'}
)

UserSchema.statics = {
  load: function (account, cb) {
    this.findOne({accountId: account}, cb)
  }
}

module.exports = mongoose.model('User', UserSchema)