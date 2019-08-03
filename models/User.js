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
  }
}, { versionKey: false });

const Model = mongoose.model('User', schema);

module.exports = Model;
