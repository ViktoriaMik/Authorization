const {User, O_Auth} = require('../models');
const {USER_ACTIVE, USER_UPDATE} = require('../constants/responce.message');
const {userNormalizator} = require('../helpers/user.normalize');
const {jwtService, passwordService} = require('../services');
const {headerToken} = require('../constants/')

module.exports = {
    activateUser: async (req, res, next) => {
        try {
            const {_id} = req.user
            await User.updateOne({_id}, {is_activated: true})
            res.status(200).json(USER_ACTIVE)
            next()
        } catch (e) {
            next(e)
        }
    },
    login: async (req, res, next) => {
        try {
            const {user} = req;
            const tokenPair = jwtService.generateTokenPair();
            const userNormalize = userNormalizator(user.toJSON());

            await O_Auth.create({
                ...tokenPair, user_id: userNormalize._id
            })

            res.json({
                user: userNormalize, ...tokenPair
            })
        } catch (e) {
            next(e)
        }
    },
    logout: async (req, res, next) => {
        try {
            const access_token = req.get(headerToken.AUTHORIZATION);

            await O_Auth.deleteOne({access_token});

            res.json('OK');
        } catch (e) {
            next(e)
        }
    },
    refresh: async (req, res, next) => {
        try {
            const {user} = req;
            const tokenPair = jwtService.generateTokenPair();
            const userNormalize = userNormalizator(user.toJSON());
            await O_Auth.create({
                ...tokenPair, user_id: userNormalize._id
            })
            res.json({
                user: userNormalize, ...tokenPair
            })
        } catch (e) {
            next(e);
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const {_id} = req.user;

            const hashedPassword = await passwordService.hash(req.body.password);
            await User.updateOne({_id}, {password: hashedPassword})

            res.code(200).json(USER_UPDATE);
            next();
        } catch (e) {
            next(e)
        }
    },
    setNewPassword: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hash(req.newPassword);
            const {_id, email} = req.user
            await User.updateOne({_id}, {password: hashedPassword})
            const user = await User.findOne({email}).select('+password')
            res.json(USER_UPDATE);
            next();
        } catch (e) {
            next(e)
        }
    }

}
