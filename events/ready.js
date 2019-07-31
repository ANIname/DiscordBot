'use strict';

const client = require('../client');

client.on('ready', async () => {
  console.info(`${client.user.username} ready to work!`);
});