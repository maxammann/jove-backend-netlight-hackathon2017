require('./company')
var mongoose = require('mongoose')
var Company = mongoose.model('Company')

exports.get = function (req, res) {
  console.log(req)
  Company.load(req.param.id, function (err, company) {
    res.json(company)
  })
}

// todo get users for specific company, which should be shown in the app (recommendations)
// todo get companies for specific account