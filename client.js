const { Client } = require('discord.js');
const importDir = require('directory-import');
const { bot } = require('./security');

const client = new Client();

client.login(bot.token);

client.on('ready', () => {
  console.info(`${client.user.username} is ready to work`);

  // noinspection JSIgnoredPromiseFromCall
  client.user.setActivity('YouTube', { type: 'WATCHING' });

  importDir('./events', 'async', (name, path, func) => {
    client.on(name, (...args) => func(...args, client));
  });
});

module.exports = client;
