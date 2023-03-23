/**
 * Slantapp code and properties {www.slantapp.io}
 */
let {ModelUser} = require('../models');
const {errorHandle} = require('../core');

//body safe state
exports.bodyParser = (req, res, next) => {
    if (!Object.keys(req.body).length > 0) throw new errorHandle("the document body is empty", 202);
    else next();
}

//admin body guard
exports.adminBodyGuard = async (req, res, next) => {
    const xToken = req.headers['x-token'];
    if (typeof xToken == 'undefined') throw new errorHandle("Unauthorized Access, Use a valid token and try again", 401);
    //check and decode confirm code validity
    const isValid = await ModelUser.findOne({where: {token: xToken}});
    if (isValid) {
        if (isValid.whoIs === 1) next();
        else throw new errorHandle("x-token is valid but is not authorized for this route, Use a valid token and try again", 401);
    } else throw new errorHandle("Invalid x-token code or token, Use a valid token and try again", 401);
}
//user body guard
exports.adminBodyGuard = async (req, res, next) => {
    const xToken = req.headers['x-token'];
    if (typeof xToken == 'undefined') throw new errorHandle("Unauthorized Access, Use a valid token and try again", 401);
    //check and decode confirm code validity
    const isValid = await ModelUser.findOne({where: {token: xToken}});
    if (isValid) {
        if (isValid.whoIs === 0) next() ;
        else throw new errorHandle("x-token is valid but is not authorized for this route, Use a valid token and try again", 401);
    } else throw new errorHandle("Invalid x-token code or token, Use a valid token and try again", 401);
}