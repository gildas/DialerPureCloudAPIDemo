var express = require('express');
var router = express.Router();

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
  console.log('User has logged out');
  console.log('killing session ' + req.session.id);
  req.session.destroy(function() { res.redirect('/'); });
});

module.exports = router;
