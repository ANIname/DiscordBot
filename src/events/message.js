const forEach = require('lodash/forEach')
const join    = require('lodash/join')
const client  = require('../client');
const fetch   = require('../services/fetch');

const { DISCORD_BOT_ID, DISCORD_BOT_TOKEN } = process.env;

let commandsIds   = ''
let commandsNames = ''

client.on('message', async (message) => {
  const interactionRegExp    = new RegExp(`^<\/(${commandsNames}):(${commandsIds})>`);
  const isInteractionMessage = interactionRegExp.test(message.content);
  const messageLength        = message.content.length;
  const authorId             = message.author.id;

  if (isInteractionMessage)        return message.delete({ timeout: messageLength * 100 });
  if (authorId === DISCORD_BOT_ID) return message.delete({ timeout: messageLength * 100 });

  console.info({ message });
});

async function fetchCommandsIds() {
  const commands = await fetch(`https://discord.com/api/v8/applications/${DISCORD_BOT_ID}/commands`, {
    headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` },
  });

  const receivedCommandsIds   = [];
  const receivedCommandsNames = [];

  forEach(commands, (command) => {
    receivedCommandsIds.push(command.id);
    receivedCommandsNames.push(command.name);
  });

  commandsIds   = join(receivedCommandsIds, '|');
  commandsNames = join(receivedCommandsNames, '|');

  setTimeout(fetchCommandsIds, 3600000); // 1 Hour
}

fetchCommandsIds()
  .catch(console.error);