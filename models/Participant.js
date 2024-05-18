const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  university: {
    type: String,
    trim: true,
    required: true,
  },
  major: {
    type: String,
    trim: true,
    required: true,
  },
  level: {
    type: String,
    trim: true,
    required: true,
  },
  isPresenting: {
    type: Boolean,
    default: false,
  },
  presentationTitle: {
    type: String,
    trim: true,
  },
  presentationDescription: {
    type: String,
    trim: true,
  },
  deleted: {
    _state: {
      type: Boolean,
      default: false,
    },
    _at: {
      type: Date,
    },
  },
  created: {
    _at: {
      type: Date,
      default: () => Date.now(),
    },
  },
});

module.exports = mongoose.model("Participant", participantSchema);
