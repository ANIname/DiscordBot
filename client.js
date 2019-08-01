'use strict';

const Discord = require('discord.js');
const importDir = require('directory-import');

const client = new Discord.Client();

(async() => {
  let token;
  try {
    token = require('./config/token')[process.env.NODE_ENV || 'development'];
  } catch (error) {
    switch (error.code) {
      case 'MODULE_NOT_FOUND': {
        return console.error(
          'Not found BOT TOKEN. Create file "config/token.json". With the following content:\n\n',

          JSON.stringify({
            "development": "PASTE BOT TOKEN HERE",
            "production": "PASTE BOT TOKEN HERE"
          }, null, 2)
        );
      }

      default: {
        console.error(error);
      }
    }
  }

  try {
    await client.login(token);
  } catch (error) {
    throw console.error(error);
  }
})();

importDir('./events', 'async');

module.exports = client;