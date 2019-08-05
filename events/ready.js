'use strict';

const ready = require('../controllers/ready');
const client = require('../client');
const db = require('../db');

client.on('ready', () => {
  console.info(`${client.user.username} bot ready to work!`);

  if (process.env.NODE_ENV === 'production') {
    // noinspection JSIgnoredPromiseFromCall
    ready.updateTopRating();
  }
});

db.once('open', () => {
  // noinspection JSUnresolvedVariable
  console.info(`Connected to ${db.db.databaseName} database`);
});
