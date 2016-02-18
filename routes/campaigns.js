var express = require('express');
var router = express.Router();

function trace_session(req) {
  console.log('Session id: ' + req.session.id);
  if (req.session.token) { console.log('Session token: ' + req.session.token); }
  if (req.session.user)  { console.log('Session user:  ' + req.session.user.username); }
}

// GET /campaigns - index
router.get('/campaigns', function(req, res, next) {
  trace_session(req);
  res.render('campaigns', { title: 'DialerPureCloudAPIDemo', token: req.session.token, current_user: req.session.user });
});

module.exports = router;
