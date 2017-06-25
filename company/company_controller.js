require('./company')
var mongoose = require('mongoose')
var Company = mongoose.model('Company')

exports.all = function (req, res) {
  Company.loadAll(function (err, companies) {
    res.json({response: companies})
  })
}

// todo get users for specific company, which should be shown in the app (recommendations)
// todo get companies for specific account