const bcrypt = require('bcrypt');
const ErrorHandler = require('../error/error.handler')
const {WRONG_EMAIL_OR_PASSWORD} = require('../error/error.message')
module.exports = {
    hash: (password) => {
        return bcrypt.hash(password, 10)
    },
    compare: async (password, hashPassword) => {
        const isPasswordMatch = await bcrypt.compare(password, hashPassword)

        if (!isPasswordMatch) {
            throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.code)
        }

    }
}
