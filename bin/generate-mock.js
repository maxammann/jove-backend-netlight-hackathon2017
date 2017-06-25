require('../account/account')
require('../user/user')
require('../company/company')
var mongoose = require('mongoose')
var faker = require('faker')
mongoose.connect('mongodb://gametec.eu:27017/devitco')
var db = mongoose.connection

db.on('error', function callback (err) {
  console.log('Connection to MongoDB failed')
  console.log(err)
})

db.once('open', function callback () {
  console.log('Connection to MongoDB successfull!')
})

var Company = mongoose.model('Company')
var Account = mongoose.model('Account')
var User = mongoose.model('User')

/*Account.remove({}, function () {
 console.log('cleared accounts')
 }).exec().resolve()
 Company.remove({}, function () {
 console.log('cleared companies')
 }).exec().resolve()
 User.remove({}, function () {
 console.log('cleared users')
 }).exec().resolve()
var waitTill = new Date(new Date().getTime() + 2 * 1000)
while (waitTill > new Date()) {}*/

var userAccount = new Account({userName: 'user', userPassword: '123456'})
userAccount.save(function (err) {
  if (err) return console.error(err)
})

var companyAccount = new Account({userName: 'company', userPassword: '123456'})
companyAccount.save(function (err) {
  if (err) return console.error(err)
})


Account.find({}, 'userName', function (err, results) {
  console.log('Accounts:' + results)
})

for (var i = 500; i >= 0; i--) {
  new Company({
    name: faker.company.companyName(),
    eMail: faker.internet.email(),
    description: faker.company.catchPhrase(),
    phone: faker.phone.phoneNumber(),
    image: faker.image.business(),
    accountId: companyAccount._id
  }).save(function (err) {
    if (err) return console.error(err)
  })
}

Company.find({}, 'name', function (err, results) {
  console.log('Companies:' + results[0])
})

for (i = 1; i >= 0; i--) {
  new User({
    name: faker.name.findName(),
    eMail: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    dateOfBirth: faker.date.past(),
    image: faker.image.avatar(),
    accountId: userAccount._id
  }).save(function (err) {
    if (err) return console.error(err)
  })
}

User.find({}, 'name photo', function (err, results) {
  console.log('Users:' + results[0])
})