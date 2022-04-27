const {Schema, model} = require('mongoose');

const OAuthShema = new Schema({
        access_token: {type: String, require: true, trim: true},
        refresh_token: {type: String, require: true, trim: true},
        user_id: {type: Schema.Types.ObjectId, ref: 'user'},
    },

    {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

OAuthShema.pre('findOne', function () {
    this.populate('user_id')
});
module.exports = model('o_auth', OAuthShema);
