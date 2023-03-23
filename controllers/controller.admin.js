/**
 * Slantapp code and properties {www.slantapp.io}
 */
const sha1 = require('sha1');
const Joi = require('joi');
/**
 * importing custom model
 */
const {useAsync, utils, errorHandle,} = require('./../core');
const {emailTemple, etpl} = require('./../services');
/**
 * importing models
 */
const {ModelUser} = require('./../models');
/**
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.index = useAsync(async (req, res) => {
    res.json(utils.JParser("Welcome to admin api", true, {}));
})
/**
 * @route-controller /api/v1/admin/start
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.adminStats = useAsync(async (req, res, next) => {
    try {
        //create data if all data available
        const schema = Joi.object({
            email: Joi.string().email({minDomainSegments: 2}).required(),
        })
        //capture user data
        const {email} = req.body;
        //validate user
        const validator = await schema.validateAsync({email});
        //hash password before checking
        const newPass = utils.AsciiCodes(8);
        const user = await ModelUser.findOne({where: validator});
        if (user) {
            const uuser = user.update({password: sha1(newPass), token: sha1(user.email + new Date().toUTCString)});
            if (uuser) {
                /**
                 * Change email template before productions
                 */
                new emailTemple(user.email)
                    .who(user.fullname)
                    .body("You requested for a password reset<br/>" +
                        "A new password has been generated for you, do login and change it immediately" +
                        "<h1 style='margin-top: 10px; margin-bottom: 10px;'>" +newPass+"</h1>"+
                        "Check out our new courses.")
                    .subject(etpl.PasswordReset).send().then(r => console.log(r));
            }
        }
        res.json(utils.JParser("ok-response", !!user, user));
    } catch (e) {
        throw new errorHandle(e.message, 202);
    }
});
