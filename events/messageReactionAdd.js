'use strict';

const client = require('../client');
const messageReaction = require('../controllers/messageReaction');

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;

  const embed = reaction.message.embeds[0];

  if (embed.title === 'Письмо с подтверждением!' && reaction.emoji.name === '✅') {
    return messageReaction.addRole(reaction, user);
  }
});