const importDIr = require('directory-import');
const { bot: { prefix } } = require('../config');

const commands = importDIr('./commands', 'async');

function supportMessage() {
  // TODO
}

async function commandExecution(message) {
  const args = message.content.split(' ');
  const command = args[0].slice(prefix.length);

  if (commands[command]) {
    await message.delete();

    commands[command](message, args);
  }
}

module.exports = { supportMessage, commandExecution };
