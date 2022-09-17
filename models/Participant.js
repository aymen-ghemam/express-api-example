const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const participantSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    year: {
        type: String,
        trim: true,
    },
    availability: {
        type: String,
        trim: true,
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

module.exports = mongoose.model('Participant', participantSchema);