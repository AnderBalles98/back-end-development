var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var componentsRouter = require('./routes/components');
var componentsAPIRouter = require('./routes/api/components');
var userAPIRouter = require("./routes/api/users");
var tokenRouter = require("./routes/token");

var passport = require("./config/passport");
var session = require("express-session");


var app = express();

// mongoose config
var mongoose = require("mongoose");
var mongoDB = "mongodb://localhost/compucomponents";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection Error"));

// session config
app.use(session({
  secret: "Mi clave secreta",
  resave: true,
  saveUninitialized: true
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './')));


// passport config
app.use(passport.initialize());
app.use(passport.session());


// paths
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/components', componentsRouter);
app.use('/api/components', componentsAPIRouter);
app.use("/api/users", userAPIRouter);
app.use("/token", tokenRouter);
app.get("/login", function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/"); 
  }
  return res.render("session/login");
});
app.post("/login", function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    } else if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, function (err){
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
});
app.get("/logout", function (req, res) {
  req.logOut();
  return res.redirect("/");
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
