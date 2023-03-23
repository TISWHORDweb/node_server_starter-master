/**
 * Slantapp code and properties {www.slantapp.io}
 */
let express = require('express');
let router = express.Router();
/**
 * Landing page router
 */
router.get('/', (req, res, next) => {
    res.json({name: 'Scriipo Acada'});
})

module.exports = router;