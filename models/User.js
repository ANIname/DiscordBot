'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: {
    type: 'string',
    required: true
  },
  xp: {
    type: 'number',
    default: 0
  },
  streaming: {
    type: 'object'
  }
}, { versionKey: false });

module.exports = mongoose.model('User', schema);
