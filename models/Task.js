const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: '0',
    },
    order: {
        type: Number,
        default: 0,
    },
    board_id: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', TaskSchema);