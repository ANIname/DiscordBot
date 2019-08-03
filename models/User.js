'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: {
    type: 'number',
    required: true
  },
  xp: {
    type: 'number',
    default: 0
  }
}, { versionKey: false });

const Model = mongoose.model('User', schema);

module.exports = Model;
