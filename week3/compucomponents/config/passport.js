const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User  = require("../models/user");
const { model } = require("../models/user");

passport.use(new LocalStrategy());

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.findById(id, cb);
});

module.exports = passport;