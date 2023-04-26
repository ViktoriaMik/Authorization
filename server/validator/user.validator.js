const Joi = require('joi');
const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../config/user.valid.data');
// const userRoles = require('../config/user.roles');

const createUserValidator = Joi.object({
    name: Joi.string().required().min(2).max(20),
    email: Joi.string()
        // .regex(EMAIL_REGEXP)
        .trim()
        .required(),
    // role: Joi.string().allow(...Object.values(userRoles)),
    password: Joi
        .string()
        // .regex(PASSWORD_REGEXP)
        .required(),
})

module.exports = {createUserValidator}
