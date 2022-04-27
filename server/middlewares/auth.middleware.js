const {jwtService} = require('../services/index');
const {INVALID_DATA} = require('../error/error.message');
const ErrorHandler = require('../error/error.handler');
const {Action} = require('../models')

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
            res.json(user)
            next();
        } catch (e) {
            next(e)
        }

    }
}
