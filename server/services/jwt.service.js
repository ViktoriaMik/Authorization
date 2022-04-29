const jwt = require('jsonwebtoken');
const ErrorHandler = require('../error/error.handler');
const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACTIVATE_SECRET,
    JWT_FORGOT_PASSWORD_SECRET
} = require('../config/config');
const {ACCESS, REFRESH, ACTIVATE, FORGOT_PASSWORD} = require('../constants/token.type.enum');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '1m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {access_token, refresh_token}
    },

    verifyToken: async (token, tokenType = ACCESS) => {
        try {
            let secret = '';
            switch (tokenType) {
                case ACCESS:
                    secret = JWT_ACCESS_SECRET;
                    break;
                case REFRESH:
                    secret = JWT_REFRESH_SECRET;
                    break;
                case ACTIVATE:
                    secret = JWT_ACTIVATE_SECRET;
                    break;
                case FORGOT_PASSWORD:
                    secret = JWT_FORGOT_PASSWORD_SECRET;
                    break;
            }
            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler('Invalid token', 401)
        }
    },
    createActionToken: (tokenType) => {
        let secret = '';
        switch (tokenType) {
            case ACTIVATE:
                secret = JWT_ACTIVATE_SECRET;
                break;
            case FORGOT_PASSWORD:

                secret = JWT_FORGOT_PASSWORD_SECRET;
                break;
        }
        return jwt.sign({}, secret, {expiresIn: '3d'})
    },

}
