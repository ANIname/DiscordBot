'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/discordBot', {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

module.exports = db;
