var express = require('express');
var router = express.Router();

// Common tracing and locals
router.use(function(req, res, next) {
  console.log("%s %s", req.method, req.path);
  console.log('Session id: ' + req.session.id);
  if (req.session.token) { console.log('Session token: ' + req.session.token); }
  if (req.session.user)  { console.log('Session user:  ' + req.session.user.username); }
  res.locals.token        = req.session.token;
  res.locals.current_user = req.session.user;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DialerPureCloudAPIDemo' });
});

router.post('/login', function(req, res, next) {
  // Regenerate session to prevent fixation
  req.session.regenerate(function() {
    req.session.token = req.body.token;
    req.session.user  = JSON.parse(req.body.user);
    console.log('User ' + req.session.user.username + ' has logged in, token: ' + req.session.token);
    console.log('created session ' + req.session.id);
    res.redirect('/');
  });
});

router.get('/logout', function(req, res, next) {
  console.log('User ' + req.session.user.username + ' has logged out');
  console.log('killing session ' + req.session.id);
  req.session.destroy(function() { res.redirect('/'); });
});

module.exports = router;
