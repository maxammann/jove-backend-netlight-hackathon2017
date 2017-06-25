var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MatchSchema = new Schema({
    //todo
  },
  {collection: 'Company'}
)

MatchSchema.statics = {
  load: function (id, cb) {
    this.findOne({_id: id}).exec(cb)
  }
}

module.exports = mongoose.model('Company', MatchSchema)