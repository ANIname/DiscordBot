'use strict';

const Discord = require('discord.js');
const importDir = require('directory-import');
const token = require('./config/token')[process.env.NODE_ENV || 'development'];

const client = new Discord.Client();

(async() => {
  if (!token) {
    return console.error(
      'Not found BOT TOKEN. Create file "config/token.json". With the following content:\n\n',

      JSON.stringify({
        "development": "PASTE BOT TOKEN HERE",
        "production": "PASTE BOT TOKEN HERE"
      }, null, 2)
    );
  }

  try {
    await client.login(token);
  } catch (error) {
    throw console.error(error);
  }
})();

importDir('./events', 'async');

module.exports = client;