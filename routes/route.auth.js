/**
 * Slantapp code and properties {www.slantapp.io}
 */
const {bodyParser} = require('../middleware/middleware.protects');

const express = require('express');
const router = express.Router();
const CoreError = require('./../core/core.error');
//load controller and utils
const {index, authLogin, authRegister, authReset} = require('./../controllers/controller.auth');
/**
 * auth routes
 */
router.get('/', index);
router.post('/login', bodyParser, authLogin);
router.post('/register', bodyParser, authRegister);
router.post('/reset', bodyParser, authReset);
/**
 * Export lastly
 */
router.all('/*', (req, res) => {
    throw new CoreError(`route not found ${req.originalUrl} using ${req.method} method`, 404);
})
module.exports = router;