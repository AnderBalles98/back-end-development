var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User  = require("../models/user");

passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({email: username}, function (err, user) {
        if (err) {
            return done(err);
        }else if(!user) {
            return done (null, false, {message: "User not found"});
        }else if (!user.validPassword(password)) {
            return done (null, false, {message: "Password wrong"});
        } else if (!user.verify) {
            return done (null, false, {message: "User not verified"});
        } else {
            return done(null, user);
        }
    });
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.findById(id, function(err, user) {
        cb(err, user);
    });
});

module.exports = passport;