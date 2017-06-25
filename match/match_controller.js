require('./match')
var mongoose = require('mongoose')
var Match = mongoose.model('Match')

exports.get = function (req, res) {
  Match.load(req.param.id, function (err, match) {
    res.json(match)
  })
}
