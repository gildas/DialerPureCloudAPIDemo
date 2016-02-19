var express = require('express');
var router  = express.Router();
var model   = 'ContactList';

// grab resource id
router.param('id', function(req, res, next, id) {
  console.log('id=' + id);
  req.id = id;
  next();
});

// GET /contactlists - index
router.get('/', function(req, res, next) {
  console.log("Listing all %s objects", model);
  res.render('contactlists/index', { title: 'DialerPureCloudAPIDemo' });
});

// POST /contactlists - Create
router.post('/', function(req, res, next) {
  console.log("Creating %s %s", model);
  res.status(404).send("Not Implemented");
});

// GET /contactlists/:id - Read
router.get('/:id', function(req, res, next) {
  console.log("Showing %s %s", model, req.id);
  res.render('contactlists/show', { title: 'DialerPureCloudAPIDemo', id: req.id });
});

// GET /contactlists/:id/edit - Edit
router.get('/:id/edit', function(req, res, next) {
  console.log("Editing %s %s", model, req.id);
  res.render('contactlists/edit', { title: 'DialerPureCloudAPIDemo', id: req.id });
});

// PUT /contactlists/:id - Update
router.put('/:id', function(req, res, next) {
  console.log("Updating %s %s", model, req.id);
});

// DELETE /contactlists/:id - Destroy
router.delete('/:id', function(req, res, next) {
  console.log("Deleting %s %s", model, req.id);
  res.status(404).send("Not Implemented");
});

// GET /contactlists/:id - Read
router.get('/:id/contacts/export', function(req, res, next) {
  console.log("Exporting Contacts for %s %s", model, req.id);
  res.render('contactlists/export_contacts', { title: 'DialerPureCloudAPIDemo', id: req.id });
});

module.exports = router;
