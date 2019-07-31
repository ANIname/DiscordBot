'use strict';

const importDIr = require('directory-import');
const client = require('../client');
const {bot: {prefix}} = require('../config');

const commands = importDIr('./commands', 'async');

client.on('message', async message => {
  if (message.author.bot) return;

  if (message.content.startsWith(prefix)) {
    const args = message.content.split(' ');
    const command = args[0].slice(1);

    if (commands[command]) {
      await message.delete();

      return commands[command](message, args);
    }
  }
});