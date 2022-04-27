const {Schema, model} = require('mongoose');
const {userRoles} = require('../constants');

const UserShema = new Schema({
        name: {type: String, require: true, trim: true},
        password: {type: String, require: true, trim: true, select: false},
        email: {unique: true, type: String, require: true, trim: true},
        role: {type: String, default: userRoles.USER, enum: Object.values(userRoles)},
        is_activated: {type: Boolean, require: true, default: false}
    },
    {
        timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}
    })

module.exports = model('user', UserShema);
