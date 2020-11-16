var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require("jsonwebtoken");


// models
const User = require("./models/user");
const Token = require("./models/token");



// routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var componentsRouter = require('./routes/components');
var componentsAPIRouter = require('./routes/api/components');
var userAPIRouter = require("./routes/api/users");
var tokenRouter = require("./routes/token");
var authRouter = require("./routes/api/auth");



var passport = require("./config/passport");
var session = require("express-session");


var app = express();

// set app atributes
app.set('secretKey', 'jwt_pwd_!!223344');


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
app.use('/users', authenticate, usersRouter);
app.use('/components', authenticate, componentsRouter);
app.use('/api/components', validateJWT, componentsAPIRouter);
app.use("/api/users", validateJWT, userAPIRouter);
app.use("/token", tokenRouter);
app.use("/api/auth", authRouter);
app.get("/login", function (req, res) {
  console.log("entra");
  if (req.isAuthenticated()) {
    return res.redirect('/');
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

function authenticate(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
}

function validateJWT(req, res, next) {
  jwt.verify(req.headers['access-token'], req.app.get('secretKey'), function (err, decoded) {
    if(err) {
      return res.json({status: 'error', message: err.message, data: null});
    }
    let userId = decoded.id;
    User.findById(userId, function(err, user) {
      if (err) {
        return res.json({status: 'error', message: err.message, data: null});
      } else if (!user) {
        return res.json({status: 'error', message: "user not found", data: null});
      }
      console.log(user);
      return next();
    });

  });
}

module.exports = app;
