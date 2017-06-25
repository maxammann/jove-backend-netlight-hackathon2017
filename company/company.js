var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CompanySchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    name: String,
    eMail: String,
    description: String,
    phone: String,
    image: String,
    accountId: {type: Schema.Types.ObjectId, ref: 'account'}
  },
  {collection: 'Company'}
)
CompanySchema.statics = {
  loadAll: function (cb) {
    this.find({}, cb)
  }
}

module.exports = mongoose.model('Company', CompanySchema)