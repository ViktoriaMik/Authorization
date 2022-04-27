const {User} = require('../models')
const {USER_ACTIVE} = require('../constants/responce.message')

module.exports = {
    activateUser: async (req, res, next) => {
        try {
            const {_id} = req.user
            await User.updateOne({_id}, {is_activated: true})
            res.status(200).json(USER_ACTIVE)
        } catch (e) {
            next(e)
        }
    }
}
