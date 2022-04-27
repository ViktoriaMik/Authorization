const {INVALID_DATA} = require('../error/error.message');
const ErrorHandler = require('../error/error.handler');
const {Action, O_Auth} = require('../models');
const {passwordService, jwtService} = require('../services');
const {headerToken, tokenType} = require('../constants/');

module.exports = {
    checkActionToken: (tokenType) => async (req, res, next) => {
        try {
            const {token} = req.params
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
            const token = req.get(headerToken.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(INVALID_DATA.message, INVALID_DATA.code)
            }
            await jwtService.verifyToken(token, tokenType.ACCESS);
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
            const token = req.get(headerToken.AUTHORIZATION);
            if (!token) {
                throw new ErrorHandler('Invalid token', 401)
            }
            await jwtService.verifyToken(token, tokenType.REFRESH);

            const {user_id: user} = await O_Auth.findOne({refresh_token: token}).populate('user_id');
            await O_Auth.remove({refresh_token: token})

            req.user = user;

            if (!user) {
                throw  new ErrorHandler(INVALID_DATA.message, INVALID_DATA.code);
            }
            next();
        } catch (e) {
            next(e)
        }
    }
}
