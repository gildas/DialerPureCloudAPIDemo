var express = require('express');
var router  = express.Router();
var model   = 'Campaign';

// Common tracing and locals
router.use(function(req, res, next) {
  console.log("%s /campaigns%s", req.method, req.path);
  console.log('Session id: ' + req.session.id);
  if (req.session.token) { console.log('Session token: ' + req.session.token); }
  if (req.session.user)  { console.log('Session user:  ' + req.session.user.username); }
  res.locals.token        = req.session.token;
  res.locals.current_user = req.session.user;
  next();
});

// grab resource id
router.param('id', function(req, res, next, id) {
  console.log('id=' + id);
  req.id = id;
  next();
});

// GET /campaigns - index
router.get('/', function(req, res, next) {
  console.log("Listing all %s objects", model);
  res.render('campaigns/index', { title: 'DialerPureCloudAPIDemo' });
});

// GET /campaigns/:id - Show
router.get('/:id', function(req, res, next) {
  console.log("Showing %s %s", model, req.id);
  res.render('campaigns/show', { title: 'DialerPureCloudAPIDemo', id: req.id });
});

// GET /campaigns/:id/edit - Edit
router.get('/:id/edit', function(req, res, next) {
  console.log("Editing %s %s", model, req.id);
  res.render('campaigns/edit', { title: 'DialerPureCloudAPIDemo', id: req.id });
});

// PUT /campaigns/:id - update
router.put('/:id', function(req, res, next) {
  console.log("Updating %s %s", model, req.id);
});

module.exports = router;
