const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const logSchema = new Schema({
  phoneNumber: {
    type: String,
    required: [true, 'A log must have a phone number!']
  },
  text: {
    type: String,
    required: [true, 'A log must have a description text!'],
    maxLength: [160, 'Description cannot be more than 160 characters!']
  },
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

const Logs = mongoose.model('Logs', logSchema);

module.exports = Logs;
