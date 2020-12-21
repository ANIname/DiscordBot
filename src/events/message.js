const startsWith = require('lodash/startsWith');
const commands   = require('../commands');
const client     = require('../client');
const config     = require('../config');

client.on('message', async (message) => {
  const isCommand = startsWith(message.content, config.commandPrefix);

  if (isCommand) await commandHandler(message);
});

async function commandHandler(message) {
  const [, commandName] = message.content.split('');

  await message.delete({ reason: 'Deleted command message!' });

  if (typeof commands[commandName] === 'function') {
    await commands[commandName](message);
  }

  else {
    const messageToDelete = await message.reply('Command not found!');

    await messageToDelete.delete({ timeout: 2000 });
  }
}