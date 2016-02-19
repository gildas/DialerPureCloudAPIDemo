var express = require('express');
var engine = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var gitrev = require('git-rev');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var routes        = require('./routes/index');
var campaigns     = require('./routes/campaigns');
var contactlists  = require('./routes/contactlists');

var app = express();

var git_commit = '';
var git_branch = '';

gitrev.short(function(value)  { git_commit = value });
gitrev.branch(function(value) { git_branch = value });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: '3EE7E60C-0F8D-41AC-BCE0-3D7E1751A78D',
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));

// Common tracing and locals
app.use(function(req, res, next) {
  console.log("%s %s", req.method, req.path);
  console.log('Session id: ' + req.session.id);
  if (req.session.token) { console.log('Session token: ' + req.session.token); }
  if (req.session.user)  { console.log('Session user:  ' + req.session.user.username); }
  res.locals.token        = req.session.token;
  res.locals.current_user = req.session.user;
  res.locals.git_commit   = git_commit;
  res.locals.git_branch   = git_branch;
  next();
});

app.use('/', routes);
app.use('/campaigns', campaigns);
app.use('/contactlists', contactlists);
app.use('/contact_lists', contactlists);

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
