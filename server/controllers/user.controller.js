const {userNormalizator} = require('../helpers/user.normalize');
const {User, Action, O_Auth} = require('../models');
const {passwordService, jwtService, emailService} = require('../services');
const {ACTIVATE} = require('../constants/token.type.enum');
const {emailAction} = require('../constants/');
const {API} = require('../config/config')

module.exports = {
    registration: async (req, res, next) => {
        try {

            const hashedPassword = await passwordService.hash(req.body.password);
            const newUser = await User.create({...req.body, password: hashedPassword});

            const {email, name} = req.body;
            const token = await jwtService.createActionToken(ACTIVATE)
            await Action.create({token, type: ACTIVATE, user_id: newUser._id})

            const URL = `${API}/auth/activate/${token}`

            await emailService.sendMail(email, emailAction.WELCOME, {userName: name, token})

            const tokenPair = jwtService.generateTokenPair();

            user = userNormalizator(newUser.toJSON());

            await O_Auth.create({
                ...tokenPair, user_id: user._id
            })
            req.user = user;
            res.cookie('refresh_token', tokenPair.refresh_token, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true})

            res.json({...tokenPair, user, token})

            next()
        } catch (e) {
            next(e)
        }

    }


}
