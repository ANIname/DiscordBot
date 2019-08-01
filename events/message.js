'use strict';

const importDIr = require('directory-import');
const forEach = require('foreach');
const client = require('../client');
const sendInviteNotification = require('../controllers/sendInviteNotification');
const {bot: {prefix}} = require('../config');

const commands = importDIr('./commands', 'async');

client.on('message', async message => {
  if (message.author.bot) return;

  // Commands
  if (message.content.startsWith(prefix)) {
    const args = message.content.split(' ');
    const command = args[0].slice(1);

    if (commands[command]) {
      await message.delete();

      return commands[command](message, args);
    }
  }

  // Mentions Check
  const membersMentions = message.mentions.members.array();

  if (membersMentions.length) {
    const WHITESPACE_LENGTH = 1;
    const MENTION_WITHOUT_ID_LENGTH = 3;
    const membersIds = [];
    let length = 0;

    forEach(membersMentions, member => {
      length += member.id.length + WHITESPACE_LENGTH + MENTION_WITHOUT_ID_LENGTH;

      membersIds.push(member.id);
    });

    if (message.content.length <= length) {
      await message.delete();

      return sendInviteNotification(message, membersIds);
    }
  }
});
