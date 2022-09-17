const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const teamSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    data: {
        type: Object,
        default: {}
    },
    deleted: {
        _state: {
            type: Boolean,
            default: false
        },
        _at: {
            type: Date,
        }
    },
    created: {
        _at: {
            type: Date,
            default: () => Date.now()
        }
    }
});

module.exports = mongoose.model('Team', teamSchema);