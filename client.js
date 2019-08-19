const { Client } = require('discord.js');
const importDir = require('directory-import');
const { bot } = require('./security');

const client = new Client();

importDir('./events', 'async', (name, path, func) => {
  client.on(name, (...args) => func(...args, client));
});

client.login(bot.token);

module.exports = client;
