/**
 * Slantapp code and properties {www.slantapp.io}
 */
let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Slant App' });
});

module.exports = router;
