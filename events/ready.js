'use strict';

const client = require('../client');
const db = require('../db');

client.on('ready', () => {
  console.info(`${client.user.username} bot ready to work!`);
});

db.once('open', () => {
  console.info(`Connected to ${db.db.databaseName} database`);
});
