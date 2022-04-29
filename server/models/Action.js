const {Schema, model} = require('mongoose');
const {tokenType} = require('../constants');

const ActionShema = new Schema({
        token: {type: String, require: true, trim: true},
        type: {type: String, require: true, enum: Object.values(tokenType)},
        user_id: {type: Schema.Types.ObjectId, ref: 'user'},
    },
    {
        timestamps: true
    });
ActionShema.pre('findOne', function () {
    this.populate('user_id')
});
module.exports = model('action', ActionShema);
