const { Client } = require('discord.js');
const importDir = require('directory-import');
const { bot } = require('./security');

const client = new Client();

importDir('./events', 'async', (name, path, func) => {
  client.on(name, (...args) => func(...args, client));
});

client.login(bot.token);

// client.login('NDI4NTk4MTM3NDkwNTA1NzI4.XVnANQ.CPDzXz5kEVfOyqip470bF4hadV0');

module.exports = client;
