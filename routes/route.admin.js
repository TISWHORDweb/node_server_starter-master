/**
 * Slantapp code and properties {www.slantapp.io}
 */
let express = require('express');
let router = express.Router();
let {errorHandle, useAsync} = require('../core');
//load middleware for admin
let {bodyParser, adminBodyGuard} = require('../middleware/middleware.protects');
//load controller for admin
let {index} = require('../controllers/controller.admin');

/* GET statistics data. */
router.get('/stats', useAsync(adminBodyGuard), useAsync(index));

module.exports = router;