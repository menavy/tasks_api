const mongoose = require('mongoose');

const BoardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Board', BoardSchema);