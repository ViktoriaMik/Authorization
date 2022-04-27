const {User, O_Auth} = require('../models');
const {USER_ACTIVE} = require('../constants/responce.message');
const {userNormalizator} = require('../helpers/user.normalize');
const {jwtService} = require('../services');
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

}
