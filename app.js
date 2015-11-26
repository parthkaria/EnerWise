var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var cookieSession = require('cookie-session');
var passport = require('passport');
var routes = require('./routes/index');
//var flash = require('req-flash');
var app = express();

var expressSession=require('express-session');

//var passport = require('passport');
//var passportLocal = require('passport-local');
// put passport config after this line
//app.use(express.session());
// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');*/

require('./config/passport')(passport);

app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(flash());
app.use(express.static(__dirname + '/views'));
app.use(cookieParser());
app.use(bodyParser());

/*app.use(expressSession({
  secret:process.env.SESSION_SECRET || 'secret',
  resave:false,
  saveUninitialized:false
}));*/

app.use(expressSession({
  secret:'secret'
}));
// passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Sequelize
/*var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://rdpenjpi:YkKrx4t3SxVm3F54KGYIQ8ASfZ6_uy0g@pellefant.db.elephantsql.com:5432/rdpenjpi');
app.use('sequelize',sequelize);*/
//var Sequelize = require('sequelize');
//var sequelize = new Sequelize('postgres://rdpenjpi:YkKrx4t3SxVm3F54KGYIQ8ASfZ6_uy0g@pellefant.db.elephantsql.com:5432/rdpenjpi');
//module.exports=sequelize;

app.use('/', routes);
app.use('/createUser',require('./routes/createUser'));
app.use('/signin',require('./routes/login'));
app.use('/helperdata',require('./routes/helperdata'));
app.use('/createHome',require('./routes/home'));

/*function isLoggedIn(req,res,next){
  if(req.isAuthenticated())
  {
    return next();
  }
  res.redirect('/');
}*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
