var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var UserAccount = require('./account');
var secretKey = require('./account_controller');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = secretKey;

function verifyJwt(jwtPayload, done) {
    UserAccount.findOne({_id: jwtPayload.account._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}


module.exports = function(passport){
    passport.use(new JwtStrategy(opts, verifyJwt));
}
