'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: 'string',
    required: true
  },
  interval: {
    type: 'number',
    default: 1000
  }
}, {versionKey: false});

module.exports = mongoose.model('Interval', schema);
