'use strict';

const Discord = require('discord.js');
const importDir = require('directory-import');
const token = require('./config/token')[process.env.NODE_ENV || 'development'];

const client = new Discord.Client();

(async() => {
  try {
    await client.login(token);
  } catch (error) {
    throw console.error(error);
  }
})();

importDir('./events', 'async');

module.exports = client;