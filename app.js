var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./user/UsersRoute');
var companies = require('./company/CompanyRoute');
var accounts = require('./account/AccountRoute');

var app = express();
//Connection to database

var mongoose = require('mongoose');
mongoose.connect('mongodb://gametec.eu:27017/devitco');
var db = mongoose.connection;

db.on('error', function callback(err) {
    console.log("Connection to MongoDB failed");
    console.log(err)
});

db.once('open', function callback(){
    console.log("Connection to MongoDB successfull!");
});

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/users', users);
app.use('/companies', companies);
app.use('/accounts', accounts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
