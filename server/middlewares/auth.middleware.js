const {INVALID_DATA} = require('../error/error.message');
const ErrorHandler = require('../error/error.handler');
const {Action, O_Auth, User} = require('../models');
const {passwordService, jwtService, emailService} = require('../services');
const {headerToken, tokenType, emailAction} = require('../constants/');

module.exports = {
    checkActionToken: (tokenType, fromParams) => async (req, res, next) => {
        try {
            const token = fromParams ? req.params.token : req.get(headerToken.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(INVALID_DATA.message, INVALID_DATA.code)
            }
            await jwtService.verifyToken(token, tokenType)
            const {user_id: user, _id} = await Action.findOne({token, type: tokenType}).populate('user_id')


            if (!user) {
                throw new ErrorHandler(INVALID_DATA.message, INVALID_DATA.code)
            }

            await Action.deleteOne({_id});
            req.user = user;

            next();
        } catch (e) {
            next(e)
        }
    },
    isPasswordMatched: async (req, res, next) => {
        try {
            const {password: hashPassword} = req.user;
            const {password} = req.body;

            await passwordService.compare(password, hashPassword);

            next()
        } catch (e) {
            next(e)
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(headerToken.AUTHORIZATION).split(' ')[1];
            if (!token) {
                throw new ErrorHandler(INVALID_DATA.message, INVALID_DATA.code)
            }
            await jwtService.verifyToken(token, tokenType.ACCESS)
            const {user_id: user} = await O_Auth.findOne({access_token: token});
            req.user = user;
            if (!user) {
                throw  new ErrorHandler(INVALID_DATA.message, INVALID_DATA.code);
            }
            next();
        } catch (e) {
            next(e)
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const access_token = req.get(headerToken.AUTHORIZATION).split(' ')[1];
            const {refresh_token, user_id: user} = await O_Auth.findOne({access_token}).populate('user_id');
            await jwtService.verifyToken(refresh_token, tokenType.REFRESH)

            let tokentPair = await O_Auth.findOneAndDelete({user_id: user._id})
            req.user = user;

            if (!user) {
                throw  new ErrorHandler(INVALID_DATA.message, INVALID_DATA.code);
            }
            next();
        } catch (e) {
            next(e)
        }
    },
    forgotPasswordEmail: async (req, res, next) => {
        try {
            const token = await jwtService.createActionToken(tokenType.FORGOT_PASSWORD);
            if (!token) {
                throw  new ErrorHandler(INVALID_DATA.message, INVALID_DATA.code)
            }
            await Action.create({token, type: tokenType.FORGOT_PASSWORD, user_id: req.user._id})
            const forgotPasswordUrl = `http://localhost:4200/auth/reset-password`
            await emailService.sendMail(req.user.email, emailAction.FORGOT_PASSWORD_EMAIL, {forgotPasswordUrl})

            req.tokenFP = token;
            res.json(token)
            next()
        } catch (e) {
            next(e)
        }
    },
    comparePassword: async (req, res, next) => {
        try {
            const {newPassword, password} = req.body;
            const token = req.get(headerToken.AUTHORIZATION)

            const {user_id: {email}} = await O_Auth.findOne({access_token: token})
            const user = await User.findOne({email}).select('+password')

            if (!token || !user) {
                throw  new ErrorHandler(INVALID_DATA.message, INVALID_DATA.code)
            }
            await passwordService.compare(req.body.password, user.password)

            req.user = user
            req.newPassword = newPassword
            next()
        } catch (e) {
            next(e)
        }
    }


}
