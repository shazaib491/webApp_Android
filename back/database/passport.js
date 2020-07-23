const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./model/users');
const config = require('../database/mongoose');

module.exports = function (passport) {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(),
        opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload.user._id, (err, User) => {
            if (err) {
                return done(err, false);
            }
            if (User) {
                return done(null, User);
                return done({
                    user: user,
                    jwtToken: token
                });
            } else {
                return done(null, false);
            }
        });
    }));
}