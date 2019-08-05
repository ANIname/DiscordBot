'use strict';

const client = require('../client');
const {bot: {prefix}} = require('../config');
const experience = require('../modules/experience');
const {
  commandExecution,
  sendInviteForUser,
  checkExistenceContent
} = require('../controllers/message');

client.on('message', async message => {
  if (message.author.bot) return;

  if (message.content.startsWith(prefix)) {
    return commandExecution(message);
  }

  if (message.content.length) {
    experience.give(message.author.id, message.content.length);
  }

  const membersMentions = message.mentions.members.array();
  if (membersMentions.length) {
    const {existence, membersIds} = await checkExistenceContent(message, membersMentions);

    if (existence) return sendInviteForUser(message, membersIds);
  }
});
