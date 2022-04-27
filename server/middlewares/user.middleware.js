const userValidator = require('../validator/user.validator');
const {User} = require('../models/index');
const ErrorHandler = require('../error/error.handler')
const {USER_ALREADY_EXIST} = require('../error/error.message')

module.exports = {
    isBodyValid: (req, res, next) => {
        const {error, value} = userValidator.createUserValidator.validate(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }
        next()
    },
    checkUserInDB: async (req, res, next) => {
        try {
            const {email} = req.body;
            const user = await User.findOne({email})

            if (user) {
                throw new ErrorHandler(USER_ALREADY_EXIST.message, USER_ALREADY_EXIST.code)
            }

            next()
        } catch (e) {
            next(e)
        }
    }

}
