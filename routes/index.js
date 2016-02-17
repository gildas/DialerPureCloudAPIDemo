var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Session token: ' + req.session.token);
  if (req.session.user) { console.log('Session user:  ' + req.session.user.username); }
  res.render('index', { title: 'DialerPureCloudAPIDemo', token: req.session.token, current_user: req.session.user });
});

router.post('/login', function(req, res, next) {
  // Regenerate session to prevent fixation
  req.session.regenerate(function() {
    req.session.token = req.body.token;
    req.session.user  = JSON.parse(req.body.user);
    console.log('User ' + req.session.user + ' has logged in, token: ' + req.session.token);
    console.log('created session: ' + req.session);
    res.redirect('/');
  });
});

router.get('/logout', function(req, res, next) {
  console.log('User ' + req.session.user.displayName + ' has logged out, token: ' + req.session.token);
  console.log('killind session');
  req.session.destroy(function() { res.redirect('/'); });
});

module.exports = router;
