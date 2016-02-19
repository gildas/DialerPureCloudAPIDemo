var express = require('express');
var router  = express.Router();
var model   = 'Contacts';

// grab resource id
router.param('id', function(req, res, next, id) {
  console.log('id=' + id);
  req.id = id;
  next();
});

// GET /contacts - index
router.get('/', function(req, res, next) {
  console.log("Listing all %s objects", model);
  res.render('contacts/index', { title: 'DialerPureCloudAPIDemo' });
});

// GET /contacts/new - new
router.get('/new', function(req, res, next) {
  console.log("Preparing new %s object", model);
  if (req.query.contactlist_id == null)
  {
    console.error("Missing contact list id");
    res.status(400).send("Missing ContactList id");
  }
  res.render('contacts/new', { title: 'DialerPureCloudAPIDemo', contactlist_id: req.query.contactlist_id});
});

// POST /contacts - Create
router.post('/', function(req, res, next) {
  console.log("Creating %s %s", model);
  res.status(404).send("Not Implemented");
});

// GET /contacts/:id - Read
router.get('/:id', function(req, res, next) {
  console.log("Showing %s %s", model, req.id);
  res.render('contacts/show', { title: 'DialerPureCloudAPIDemo', id: req.id });
});

// GET /contacts/:id/edit - Edit
router.get('/:id/edit', function(req, res, next) {
  console.log("Editing %s %s", model, req.id);
  res.render('contacts/edit', { title: 'DialerPureCloudAPIDemo', id: req.id });
});

// PUT /contacts/:id - Update
router.put('/:id', function(req, res, next) {
  console.log("Updating %s %s", model, req.id);
});

// DELETE /contacts/:id - Destroy
router.delete('/:id', function(req, res, next) {
  console.log("Deleting %s %s", model, req.id);
  res.status(404).send("Not Implemented");
});

module.exports = router;
