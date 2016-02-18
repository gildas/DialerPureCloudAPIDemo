var express = require('express');
var router  = express.Router();
var model   = 'ContactList';

// Common tracing and locals
router.use(function(req, res, next) {
  console.log("%s /contactlists%s", req.method, req.path);
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
  res.render('contactlists/index', { title: 'DialerPureCloudAPIDemo' });
});

// POST /campaigns - Create
router.post('/', function(req, res, next) {
  console.log("Creating %s %s", model);
  res.status(404).send("Not Implemented");
});

// GET /campaigns/:id - Read
router.get('/:id', function(req, res, next) {
  console.log("Showing %s %s", model, req.id);
  res.render('contactlists/show', { title: 'DialerPureCloudAPIDemo', id: req.id });
});

// GET /campaigns/:id/edit - Edit
router.get('/:id/edit', function(req, res, next) {
  console.log("Editing %s %s", model, req.id);
  res.render('contactlists/edit', { title: 'DialerPureCloudAPIDemo', id: req.id });
});

// PUT /campaigns/:id - Update
router.put('/:id', function(req, res, next) {
  console.log("Updating %s %s", model, req.id);
});

// DELETE /campaigns/:id - Destroy
router.delete('/:id', function(req, res, next) {
  console.log("Deleting %s %s", model, req.id);
  res.status(404).send("Not Implemented");
});

module.exports = router;
