const Promise          = require('bluebird');
const client           = require('../client');
const setUpStatusEmbed = require('../utils/set-up-status-embed');

client.on('ready', async () => {
  await Promise.all([
    setUpStatusEmbed(),
  ]);

  console.info(client.user.username, 'bot started!');
});
