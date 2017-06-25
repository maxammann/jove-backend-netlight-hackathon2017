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
    account: {type: Schema.Types.ObjectId, ref: 'account'}
  },
  {collection: 'Company'}
)

CompanySchema.statics = {
  load: function (id, cb) {
    this.findOne({_id: id}).exec(cb)
  }
}

module.exports = mongoose.model('Company', CompanySchema)