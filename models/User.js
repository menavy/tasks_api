const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'New User',
    },
});

module.exports = mongoose.model('User', UserSchema);