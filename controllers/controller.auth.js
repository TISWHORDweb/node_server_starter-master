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
    res.json(utils.JParser("Welcome to auth api", true, {}));
})
/**
 * @route-controller /api/v1/auth/login
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.authLogin = useAsync(async (req, res, next) => {
    try {
        //create data if all data available
        const schema = Joi.object({
            email: Joi.string().email({minDomainSegments: 2}).required(),
            password: Joi.string().min(6).max(12).required()
        })
        //capture user data
        const {email, password} = req.body;
        //validate user
        const validator = await schema.validateAsync({email, password});
        //hash password before checking
        validator.password = sha1(validator.password);
        const user = await ModelUser.findOne({where: validator});
        res.json(utils.JParser("ok-response", !!user, user));
    } catch (e) {
        throw new errorHandle(e.message, 202);
    }
});

/**
 * @route-controller /api/v1/auth/register
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.authRegister = useAsync(async (req, res, next) => {
    try {
        //create data if all data available
        const schema = Joi.object({
            email: Joi.string().email({minDomainSegments: 2}).required(),
            fullname: Joi.string().min(3).max(150).required(),
            password: Joi.string().min(6).max(12).required()
        })
        //validate user
        const value = await schema.validateAsync(req.body);
        //rebuild user object
        value.apiKey = sha1(value.email + new Date().toISOString);
        value.token = sha1(value.email + new Date().toISOString)
        value.password = sha1(value.password);
        //insert into db
        const [user, created] = await ModelUser.findOrCreate({
            where: {email: value.email},
            defaults: value
        });
        //indicate if the user is newx
        let newUser = JSON.parse(JSON.stringify(user));
        newUser['created'] = created;
        res.json(utils.JParser("ok-registration is successful", true, newUser));
        console.log(created);
        //send a welcome email here
        if (created) {
            /**
             * Change email template before productions
             */
            return;
            new emailTemple(user.email)
                .who(user.fullname)
                .body("Welcome to scriipo academy 2022 where you can learn, master and earn conveniently. " +
                    "Welcome to scriipo academy where you can learn, master and earn conveniently. " +
                    "Welcome to scriipo academy where you can learn, master and earn conveniently. " +
                    "Welcome to scriipo academy where you can learn, master and earn conveniently. ")
                .subject(etpl.WelcomeEmail).send().then(r => console.log(r));
        }
    } catch (e) {
        throw new errorHandle(e.message, 202);
    }
});

/**
 * @route-controller /api/v1/auth/reset
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.authReset = useAsync(async (req, res, next) => {
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
