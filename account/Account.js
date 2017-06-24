var mongoose = require('mongoose'); //mongoose wird importiert
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
        created: {
            type: Date,
            default: Date.now
        },
        username: String,
        password: String
    },
    {collection: 'account'}
);

AccountSchema.statics = {
    load: function(id, cb){
        this.findOne({_id : id}).exec(cb);
    }
};

module.exports = mongoose.model('Account', AccountSchema);