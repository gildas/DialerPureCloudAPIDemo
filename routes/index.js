var express = require('express');
var router = express.Router();
var current_user = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', current_user: current_user });
});

module.exports = router;
